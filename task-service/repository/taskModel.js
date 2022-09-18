import mongoose from "mongoose";
var Schema = mongoose.Schema;
let TaskModelSchema = new Schema({
	description: {
		type: String,
		required: true,
		unique: true,
	},
	isChecked: {
		type: Boolean,
		required: true,
	},
});

export default mongoose.model("TaskModel", TaskModelSchema);
