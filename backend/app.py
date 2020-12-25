from flask import Flask, Response, jsonify, json, request
from flask_sqlalchemy import SQLAlchemy
import json
import make_json_serializable  # This is used, as it changes json default encoder
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./usersDB.db'
db = SQLAlchemy(app)


# User DB - id:Integer, userNme:Text
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.Text, nullable=False)

    def __str__(self):
        return f'{self.userId} {self.userName}'


# to get Json structure
def users_serializer(user):
    return{
        'userId': user.id,
        'userName': user.userName
    }


# Room DB - id :Integer, Participant_1: Integer, Participant_2: Integer
class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    participant_1 = db.Column(db.Integer, nullable=True)
    participant_2 = db.Column(db.Integer, nullable=True)

    def insert_participant(self, uId: int):
        room = Room.query.get(self.id)
        if self.participant_1 == None:
            room.participant_1 = uId
            db.session.commit()
        elif self.participant_2 == None:
            room.participant_2 = uId
            db.session.commit()
        else:
            raise ValueError("Only 2 participants in a room")

    def get_room_id(self):
        return self.id

    def to_json(self):
        return {
            "id": self.get_room_id(),
            "participant_1": self.participant_1,
            "participant_2": self.participant_2
        }


@app.route('/users', methods=["GET"])
def index():
    return jsonify([*map(users_serializer, User.query.all())])


@app.route('/rooms')
def test():
    rooms = Room.query.all()
    # DEBUG: print(rooms)
    return json.dumps(rooms)


# Creates a User from the frontend delivered JSON, add to DB
@app.route('/users/createUser', methods=["POST"])
def createUser():
    data = json.loads(request.data)
    # DEBUG: print("This is REQ DATA:" + str(data))
    user = User(id=data['userId'], userName=data['userName'] )
    db.session.add(user)
    db.session.commit()
    return {'201': str(user.userName)}


@app.route('/rooms/addRoom', methods = ['POST'])
def addRoom():
    try:
        room = Room()
        db.session.add(room)
        db.session.commit()
        return{"202": "room was added"}
    except:
        return {'404': "exception from addRoom"}


@app.route('/rooms/addUserToRoom', methods=["POST"])
def addUserToRoom():
    data = json.loads(request.data)
    # Debug: print("This is REQ DATA:" + str(data))
    roomId = data['roomId']
    userId = data['userId']
    rooms = Room.query.all()

    for room in rooms:
        # print("room ID is: " + str(room.get_room_id()))
        # print("room id from DATA:" + str(roomId))
        if (room.participant_1 == userId) or (room.participant_2 == userId):
            return {"202": "user already registered to room"}
    for room in rooms:
        if room.get_room_id() == roomId:
            room.insert_participant(userId)
            # rooms = Room.query.all()
            # print(rooms)
            return {"202": " user inserted to room!"}
    return{"404": "cant find room"}
    # except:
    #     return {"202": "cant insert room to roomsList"}
    # finally:
    #     return {"202": "xxx insert room to roomsList"}



def testing():
    user_a = User(userName='Hila')
    user_b = User(userName='Ron')
    db.session.add(user_a)
    db.session.add(user_b)
    db.session.commit()


if __name__ == '__main__':
    db.drop_all()
    db.create_all()

    rooms = [Room(), Room()]
    [db.session.add(room) for room in rooms]
    db.session.commit()
    #testing()
    app.run()