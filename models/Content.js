const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    maxlength: 300
  },
  type: {
    type: String,
    enum: ['page', 'post', 'section'],
    default: 'page'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featuredImage: {
    url: String,
    alt: String,
    caption: String
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    metaImage: String
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  language: {
    type: String,
    default: 'ar',
    enum: ['ar', 'en']
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create text index for search
contentSchema.index({
  title: 'text',
  content: 'text',
  excerpt: 'text',
  tags: 'text'
});

// Virtual for content URL
contentSchema.virtual('url').get(function() {
  return `/${this.type === 'post' ? 'blog' : this.type}s/${this.slug}`;
});

// Pre-save hook to generate slug
contentSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\u0600-\u06FF\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-') // Replace multiple - with single -
      .trim();
  }
  next();
});

module.exports = mongoose.models.Content || mongoose.model('Content', contentSchema);
