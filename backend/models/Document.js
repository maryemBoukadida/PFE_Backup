const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre est requis'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    fileType: {
      type: String,
      required: true
    },
    fileSize: {
      type: Number,
      required: true
    },
    filePath: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
  uploadedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: false
},
    tags: [String]
  },
  {
    timestamps: true
  }
);

documentSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;