const { object, boolean } = require("webidl-conversions");

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      nama: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      tokenEmail: String,
      isVerified: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("users", schema);
  return User;
};
