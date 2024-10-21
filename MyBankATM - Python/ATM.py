# in order to develop this code, I went to the testing tool page and checked what the test script was. I copy-pasted the script into an AI tool and after the analysis of it, I came here and wrote a code that makes sense with the test. I will use Flask so you may need to install it, I just wrote a sample code here.


from flask import Flask, request, jsonify

app = Flask(__name__)

# I create a dict to store the account data
accounts = {}

# I reset the state before anything is tested
@app.route("/reset", methods=["POST"])
def reset():
    global accounts
    accounts = {}
    return "", 200

# Now I get the balance for a hypothetical account
@app.route("balance", methods=["GET"])
def get_balance():
    account_id = request.args.get("account_id")
    if account_id not in accounts:
        return "", 404
    return jsonify({"balance": accounts[account_id]["balance"]}), 200

# In this part here, I will process possible events, such as deposit, withdraw, transfer
@app.route("/event", methods=["POST"])
def handle_event():
    data = request.get.json()
    event_type = data.get("type")
    origin = data.get("origin")
    destination = data.get("destination")
    amount = data.get("amount")

    if not all([event_type, origin, amount]):
        return "Missing required fields", 400
    
    if event_type not in ("deposit", "withdraw", "transfer"):
        return "Invalid event type", 400
    
    if event_type == "deposit" and destination not in accounts:
        accounts[destination] = {"balance": 0}

    if (event_type in ("withdraw", "transfer") and origin not in accounts):
        return "Origin account not found", 400
    
    if event_type == "deposit":
        accounts[destination]["balance"] += amount
    elif event_type == "withdraw":
        if accounts[origin]["balance"] < amount:
            return "Insufficient funds", 400
        accounts[origin]["balance"] -= amount
    elif event_type == "transfer":
        if accounts[origin]["balance"] < amount:
            return "Insufficient funds", 400
        accounts[origin]["balance"] -= amount
        accounts.setdefault(destination, {"balance": 0})["balance"] += amount
    
    return jsonify(
        {
            "origin": accounts.get(origin),
            "destination":accounts.get(destination)
        }
    ), 201

if __name__ == "__main__":
    app.run(debug=True)