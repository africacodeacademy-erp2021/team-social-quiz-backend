const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aca_tsq", { useNewUrlParser: true });
const ObjectId = mongoose.Schema.Types.ObjectId;

const SocialSchema = new mongoose.Schema(
  {
    github: {      
        credentials: {
          email: {
            type: String,
            unique: true,
          },
          password: {   
            type: String,
            unique: true,
          }
        },
        
      },

    google: {      
        credentials: {
          email: {
            type: String,
            unique: true,
          },
          password: {   
            type: String,
            unique: true,
          }
        },
        
      },
   
    facebook: {      
        credentials: {
          username: {
            type: String,
            trim: true,
          },
          password: {   
            type: String,
            unique: true,
          }
        },
        
      },
  },
  {
    
    timestamps: true,
    
  }
);

const Socials = mongoose.model("Socials", SocialSchema);

module.exports = Socials;
