from app import db

class FlightStatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    flight_number = db.Column(db.String(20), unique=True, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    gate = db.Column(db.String(10), nullable=True)
