import { sendMethodNotAllowed, sendOk } from "../../../../utils/apiMethods";
import { COLLENTION_NAME } from "../../../../utils/constants";
import { getCollection } from "../../../../utils/functions";

const getTasks = async () => {
  const collection = await getCollection(COLLENTION_NAME);
  return await collection.find({}).toArray();
};

const createTask = async (data) => {
  const collection = await getCollection(COLLENTION_NAME);

  
  const result = await collection.insertOne(data);

  
  const insertedTask = await collection.findOne({ _id: result.insertedId });

  return insertedTask;
};

export default async function handler(req, res) {
  const { method, body } = req;

  try {
    let result = null;

    switch (method) {
      case "GET":
        result = await getTasks();
        break;
      case "POST":
        result = await createTask(body);
        break;
      default:
        return sendMethodNotAllowed(res, "Method Not Allowed!");
    }

    return sendOk(res, result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
