from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class SubscriptionRequest(BaseModel):
    email: str

class SubscriptionUpdate(BaseModel):
    email: str
    status: str

# Simulated database
subscriptions = {}

@app.post('/api/subscribe')
async def subscribe(request: SubscriptionRequest):
    # Store the email in the simulated database
    subscriptions[request.email] = {'status': 'subscribed'}
    return {'message': 'Subscription successful'}

@app.put('/api/subscribe')
async def update_subscription(request: SubscriptionUpdate):
    if request.email not in subscriptions:
        raise HTTPException(status_code=404, detail='Subscription not found')
    subscriptions[request.email]['status'] = request.status
    return {'message': 'Subscription updated successfully'}

# Additional error handling can be added here 