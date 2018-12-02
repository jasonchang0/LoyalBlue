from twilio.rest import Client

def send_message(target, message):
    account_sid = "ACfc94fb684e763d7cd549da45990563cd"
    auth_token = "6cf13892521ffc3833dd3610a3861bb5"
    client = Client(account_sid, auth_token)

    message = client.messages.create(
    to="+1" + target,
    from_ = "+14243702512",
    body = message
    )

