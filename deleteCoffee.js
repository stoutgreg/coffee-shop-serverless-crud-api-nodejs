constAWS = require('aws-sdk');
const dynamoDb = newAWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  const { order_id, customer_name } = requestBody;

  const params = {
    TableName: 'CoffeeOrders',
    Key: {
      OrderId: order_id,
      CustomerName: customer_name
    }
  };

  try {
    await dynamoDb.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Order deleted successfully!', OrderId: order_id })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Could not delete order: ${error.message}` })
    };
  }
};