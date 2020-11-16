from flask import Flask, Response
import uuid
import json
import make_json_serializable  # This is used, as it changes json default encoder
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


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

    def to_json(self):
        return {
            "id": self._id,
            "participants": self._participants
        }


@app.route('/rooms')
def test():
    rooms = [Room(0, 0), Room(0, 0)]
    return json.dumps(rooms)


if __name__ == '__main__':
    app.run()
