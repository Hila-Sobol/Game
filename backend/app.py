from flask import Flask, Response, jsonify, json, request
from flask_sqlalchemy import SQLAlchemy
import uuid
import json
import make_json_serializable  # This is used, as it changes json default encoder
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./usersDB.db'
db = SQLAlchemy(app)

users = []
rooms = []


# User DB - id:Integer, userNme:Text
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.Text, nullable=False)

    def __str__(self):
        return f'{self.userId} {self.userName}'


# to create Json structure
def users_serializer(user):
    return{
        'userId': user.id,
        'userName': user.userName
    }


# Room - id :Integer, Participants: <Int> array for userId
class Room:
    def __init__(self, p1_id: int, p2_id: int):
        self._id = uuid.uuid4().int
        self._participants = [p1_id, p2_id]

    def insert_participant(self, p_uuid: int):
        if self._participants[0] == 0:
            self._participants[0] = p_uuid
        elif self._participants[1] == 0:
            self._participants[1] = p_uuid
        else:
            raise ValueError("Only 2 participants in a room")

    def get_room_id(self):
        return self._id

    def to_json(self):
        return {
            "id": self.get_room_id(),
            "participants": self._participants
        }


@app.route('/users', methods = ["GET"])
def index():
    return jsonify([*map(users_serializer, User.query.all())])


@app.route('/rooms')
def test():
    rooms.append(Room(0, 0))
    rooms.append(Room(0, 0))
    return json.dumps(rooms)

# Creates a User from the frontend delivered JSON, add to DB
@app.route('/users/createUser', methods=["POST"])
def createUser():
    data = json.loads(request.data)
    #print("This is REQ DATA:" + str(data))
    user = User(id=data['userId'], userName=data['userName'] )
    users.append(user)
    db.session.add(user)
    db.session.commit()
    return {'201': str(user.userName)}


@app.route('/rooms/addUserToRoom', methods=['POST'])
def addUserToRoom():
    data = json.loads(request.data)
    print("This is REQ DATA:" + str(data))

    roomId = data['roomId']
    userId = data['userId']
    try:
        for room in rooms:
            print("room ID is: " + str(room.get_room_id()))
            print("room id from DATA:" + str(roomId))
            if room.get_room_id() == roomId:
                room.insert_participant(userId)
                return {"202": "user inserted to room!"+str(userId)}
            else:
                return{"202": "cant find room"}
    except:
        return {"202": "cant insert room to roomsList"}



def testing():
    user_a = User(userName='Hila')
    user_b = User(userName='Ron')
    db.session.add(user_a)
    db.session.add(user_b)
    db.session.commit()


if __name__ == '__main__':
    db.drop_all()
    db.create_all()
    #testing()
    app.run()