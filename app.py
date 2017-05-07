from flask import Flask, jsonify
app = Flask(__name__)

power_on = False

@app.route("/trainStatus")
def hello():
    global power_on
    power_on = not power_on
    return jsonify({'powerOn': power_on})

if __name__ == "__main__":
    app.run()
