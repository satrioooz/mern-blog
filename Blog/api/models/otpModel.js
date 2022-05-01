module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
     email: {
        type: String,
        required: true,
     },
     otp: {
        type:String,
        required: true,
     },
     createdAt: {type: Date, default: Date.now, index: {expires: 300}}
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Otp = mongoose.model("otps", schema);
  return Otp;
};
