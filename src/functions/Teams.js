'use strict';

const Teams = require('./Teams.mongo'); // Import the model
const { connectToDatabase } = require('../services/mongo');

module.exports.getTeams = async () => {
    const dbConnection = await connectToDatabase();

    try {
        const teams = await Teams.find().select('id name').sort('id'); 

        if (!teams || teams.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Teams not found' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        } else {
            const teamData = teams.map(team => ({
                id: team.id,
                name: team.name,
            }));

            return {
                statusCode: 200,
                body: JSON.stringify(teamData),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};

module.exports.postTeam = async (event) => {
    console.log('Event body:', event);
    
    const formData = event;

    try {
        // Parse the form data and extract fields
        const { id, name, image, about, contentType } = formData;
        console.log('Event id:', id);
        console.log('Event id:', name);
        // Convert the image data from base64 to a buffer
        const fileBuffer = Buffer.from(image, 'base64');

        // Create a new team instance
        const team = new Teams({
            id,
            name,
            image: fileBuffer,
            about,
            contentType,
        });

        // Save the team to the database
        await team.save();

        return {
            statusCode: 201,
            body: "Team uploaded and saved successfully"
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};

module.exports.getaTeam = async (event) => {
    const dbConnection = await connectToDatabase();
    const TeamId = event.pathParameters.id;
    
    console.log('Team Id: ' + TeamId);
  
    try {
        const ateam = await Teams.findOne({ id: TeamId });
      
        if (!ateam) {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Team not found' }),
            headers: {
              'Content-Type': 'application/json'
            }
          };
        } else {
          const imageData = ateam.image.toString('base64');
          const imageContentType = ateam.contentType;
          const imageBase64 = `data:${imageContentType};base64,${imageData}`;
          
          return {
            statusCode: 200,
            body: JSON.stringify({
              id: ateam.id,
              name: ateam.name,
              image: imageBase64,
              about: ateam.about,
              contentType: ateam.contentType,
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          };
        }
      } catch (err) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Internal Server Error' }),
          headers: {
            'Content-Type': 'application/json'
          }
        };
    }      
};

module.exports.deletaaTeam = async (event) => {
    const dbConnection = await connectToDatabase();
    const TeamId = event.pathParameters.id;
    
    console.log('Team Id: ' + TeamId);
  
    try {
        const deletedTeam = await Teams.findOneAndDelete({ id: TeamId });
      
        if (!deletedTeam) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Team not found' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Team deleted successfully' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
      } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }      
};
