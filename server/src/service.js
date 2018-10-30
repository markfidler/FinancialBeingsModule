'use strict';

/**
 * @module service.js
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */

const __teams = {
  'teams': {
    'edges': [
      {
        'node': {
          'id': 'cjmvo1fjm001f0837avle3wmw',
          'name': 'DummyTeam',
          'slug': 'dummyteam',
          'owner': 'github|9479367',
          'status': [],
          'createdAt': '2018-10-05T07:05:58.262Z',
          'profile': {
            'avatar': 'https://algobotcommstorage.blob.core.windows.net/dummyteam/dummyteam-avatar.jpg?0.4277455294804098',
            'banner': 'https://algobotcommstorage.blob.core.windows.net/dummyteam/dummyteam-banner.jpg?0.5857963166560138',
            'description': '',
            'motto': 'Get ready for the Dummies!',
            'updatedAt': '2018-10-05T07:25:11.430Z'
          },
          'members': [
            {
              'role': 'OWNER',
              'email': null,
              'member': null,
              'status': []
            }
          ],
          'fb': []
        }
      },
      {
        'node': {
          'id': 'cjmvp2omk002a0837ec6pub93',
          'name': 'Spartans',
          'slug': 'spartans',
          'owner': 'auth0|5bb7075508c77d25edced115',
          'status': [],
          'createdAt': '2018-10-05T07:34:56.301Z',
          'profile': {
            'avatar': 'https://algobotcommstorage.blob.core.windows.net/spartans/spartans-avatar.jpg?0.29996133770250655',
            'banner': 'https://algobotcommstorage.blob.core.windows.net/spartans/spartans-banner.jpg?0.08505054336093698',
            'description': 'We wear funny capes, use make up to create the illusion of stone-carved abs and go to war half-naked to scare the enemy...',
            'motto': 'This is Sparta!',
            'updatedAt': '2018-10-05T18:09:44.911Z'
          },
          'members': [
            {
              'role': 'OWNER',
              'email': null,
              'member': {
                'alias': 'leonidas',
                'authId': 'auth0|5bb7075508c77d25edced115'
              },
              'status': []
            }
          ],
          'fb': []
        }
      },
      {
        'node': {
          'id': 'cjmvx5zku002n083759wx8nq0',
          'name': 'AAVikings',
          'slug': 'aavikings',
          'owner': 'github|34651529',
          'status': [],
          'createdAt': '2018-10-05T11:21:27.391Z',
          'profile': {
            'avatar': 'https://algobotcommstorage.blob.core.windows.net/aavikings/aavikings-avatar.jpg?0.6595332875974467',
            'banner': 'https://algobotcommstorage.blob.core.windows.net/aavikings/aavikings-banner.jpg?0.6619661353658464',
            'description': '',
            'motto': 'You better be prepared!',
            'updatedAt': '2018-10-06T13:41:46.779Z'
          },
          'members': [
            {
              'role': 'OWNER',
              'email': null,
              'member': {
                'alias': 'matbenitez',
                'authId': 'github|34651529'
              },
              'status': []
            }
          ],
          'fb': []
        }
      },
      {
        'node': {
          'id': 'cjn0qh0nb00hf0832c89f8951',
          'name': 'The Wolfies',
          'slug': 'the-wolfies',
          'owner': 'auth0|5bb8bc25b76b8011ae24c40e',
          'status': [
            {
              'status': 'ACTIVE',
              'reason': 'Team created',
              'createdAt': '2018-10-08T20:12:55.559Z'
            }
          ],
          'createdAt': '2018-10-08T20:12:55.558Z',
          'profile': {
            'avatar': 'https://algobotcommstorage.blob.core.windows.net/the-wolfies/the-wolfies-avatar.jpg?0.1436240516609537',
            'banner': 'https://algobotcommstorage.blob.core.windows.net/the-wolfies/the-wolfies-banner.jpg?0.38747742225405224',
            'description': '',
            'motto': '',
            'updatedAt': '2018-10-08T20:13:21.126Z'
          },
          'members': [
            {
              'role': 'OWNER',
              'email': null,
              'member': {
                'alias': 'matias',
                'authId': 'auth0|5bb8bc25b76b8011ae24c40e'
              },
              'status': []
            }
          ],
          'fb': [
            {
              'id': 'cjn0qh0nl00hl08324tt7af7u',
              'name': 'Dumper Wolf',
              'slug': 'dumper-wolf',
              'avatar': 'https://algobotcommstorage.blob.core.windows.net/aateammodule/aa-avatar-default.png',
              'kind': 'TRADER',
              'status': [
                {
                  'status': 'ACTIVE',
                  'reason': 'Cloned on team creation',
                  'createdAt': '2018-10-08T20:12:55.559Z'
                }
              ]
            }
          ]
        }
      },
      {
        'node': {
          'id': 'cjn0r4bsa00ia08327lqr6bhp',
          'name': 'Crypto Mooners',
          'slug': 'crypto-mooners',
          'owner': 'auth0|5bbbbcd2d181e26fc44c1635',
          'status': [
            {
              'status': 'ACTIVE',
              'reason': 'Team created',
              'createdAt': '2018-10-08T20:31:03.082Z'
            }
          ],
          'createdAt': '2018-10-08T20:31:03.082Z',
          'profile': {
            'avatar': 'https://algobotcommstorage.blob.core.windows.net/crypto-mooners/crypto-mooners-avatar.jpg?0.1730763727601694',
            'banner': 'https://algobotcommstorage.blob.core.windows.net/crypto-mooners/crypto-mooners-banner.jpg?0.5810567298809526',
            'description': '',
            'motto': '',
            'updatedAt': '2018-10-08T20:37:39.554Z'
          },
          'members': [
            {
              'role': 'OWNER',
              'email': null,
              'member': {
                'alias': 'cryptomoon',
                'authId': 'auth0|5bbbbcd2d181e26fc44c1635'
              },
              'status': []
            }
          ],
          'fb': [
            {
              'id': 'cjn0r4bso00ig0832baqj80yt',
              'name': 'Moon Trader',
              'slug': 'moon-trader',
              'avatar': 'https://algobotcommstorage.blob.core.windows.net/aateammodule/aa-avatar-default.png',
              'kind': 'TRADER',
              'status': [
                {
                  'status': 'ACTIVE',
                  'reason': 'Cloned on team creation',
                  'createdAt': '2018-10-08T20:31:03.082Z'
                }
              ]
            }
          ]
        }
      },
      {
        'node': {
          'id': 'cjng86isn01850832x476e9sa',
          'name': 'Algoteers',
          'slug': 'algoteers',
          'owner': 'github|361344',
          'status': [
            {
              'status': 'ACTIVE',
              'reason': 'Team created',
              'createdAt': '2018-10-19T16:25:11.591Z'
            }
          ],
          'createdAt': '2018-10-19T16:25:11.590Z',
          'profile': {
            'avatar': 'https://aadevelop.blob.core.windows.net/module-teams/algoteers/algoteers-avatar.jpg?0.7511092274915918',
            'banner': 'https://aadevelop.blob.core.windows.net/module-teams/algoteers/algoteers-banner.jpg?0.8315550008606407',
            'description': 'Yaaayy Algoteers!',
            'motto': 'All for Algos, Algos for All',
            'updatedAt': '2018-10-19T16:26:52.211Z'
          },
          'members': [
            {
              'role': 'OWNER',
              'email': null,
              'member': {
                'alias': 'bearcanrun',
                'authId': 'github|361344'
              },
              'status': []
            }
          ],
          'fb': [
            {
              'id': 'cjng86it0018b0832ra99qbwn',
              'name': 'Mousequeton',
              'slug': 'mousequeton',
              'avatar': 'https://algobotcommstorage.blob.core.windows.net/aateammodule/aa-avatar-default.png',
              'kind': 'TRADER',
              'status': [
                {
                  'status': 'ACTIVE',
                  'reason': 'Cloned on team creation',
                  'createdAt': '2018-10-19T16:25:11.591Z'
                }
              ]
            }
          ]
        }
      },
      {
        'node': {
          'id': 'cjnlf7p8e00520871vfkcv5fy',
          'name': 'Bear Bots 8',
          'slug': 'bear-bots-8',
          'owner': 'auth0|5bca116f8f65fb7f29351569',
          'status': [
            {
              'status': 'ACTIVE',
              'reason': 'Team created',
              'createdAt': '2018-10-23T07:40:54.781Z'
            }
          ],
          'createdAt': '2018-10-23T07:40:54.780Z',
          'profile': {
            'avatar': 'https://aadevelop.blob.core.windows.net/module-teams/module-default/aa-avatar-default.png',
            'banner': 'https://aadevelop.blob.core.windows.net/module-teams/module-default/aa-banner-default.png',
            'description': null,
            'motto': null,
            'updatedAt': '2018-10-23T07:40:54.780Z'
          },
          'members': [
            {
              'role': 'OWNER',
              'email': null,
              'member': {
                'alias': 'bearcanrun2',
                'authId': 'auth0|5bca116f8f65fb7f29351569'
              },
              'status': []
            }
          ],
          'fb': [
            {
              'id': 'cjnlf7p8v005b0871gtldaxjp',
              'name': 'Cub Bot 8',
              'slug': 'cub-bot-8',
              'avatar': 'https://aadevelop.blob.core.windows.net/module-teams/module-default/aa-avatar-default.png',
              'kind': 'TRADER',
              'status': [
                {
                  'status': 'ACTIVE',
                  'reason': 'Cloned on team creation',
                  'createdAt': '2018-10-23T07:40:54.781Z'
                }
              ]
            }
          ]
        }
      },
      {
        'node': {
          'id': 'cjnlqituh006u0871x63l92sf',
          'name': 'AlgosAnonymous',
          'slug': 'algosanonymous',
          'owner': 'auth0|5bcded939a5a5e6352a0e7f9',
          'status': [
            {
              'status': 'ACTIVE',
              'reason': 'Team created',
              'createdAt': '2018-10-23T12:57:29.751Z'
            }
          ],
          'createdAt': '2018-10-23T12:57:29.750Z',
          'profile': {
            'avatar': 'https://aadevelop.blob.core.windows.net/module-teams/module-default/aa-avatar-default.png',
            'banner': 'https://aadevelop.blob.core.windows.net/module-teams/module-default/aa-banner-default.png',
            'description': null,
            'motto': null,
            'updatedAt': '2018-10-23T12:57:29.751Z'
          },
          'members': [
            {
              'role': 'OWNER',
              'email': null,
              'member': {
                'alias': 'ookie',
                'authId': 'auth0|5bcded939a5a5e6352a0e7f9'
              },
              'status': []
            }
          ],
          'fb': [
            {
              'id': 'cjnlqitv700730871sz9oui22',
              'name': 'AABot',
              'slug': 'aabot',
              'avatar': 'https://aadevelop.blob.core.windows.net/module-teams/module-default/aa-avatar-default.png',
              'kind': 'TRADER',
              'status': [
                {
                  'status': 'ACTIVE',
                  'reason': 'Cloned on team creation',
                  'createdAt': '2018-10-23T12:57:29.751Z'
                }
              ]
            }
          ]
        }
      }
    ]
  }
};

const _ = require('lodash');
const {logger} = require('./utils');
const {GraphQLError} = require('graphql');
const BEINGS_FRAGMENT = require('./db/BeingsFragment');
const {getTeamByID, getAllTeams} = require('./gateways/teams');

/**
 * Check ownership.
 * @param {Object!} owner - The employee who is responsible for the project.
 * @param {String!} financialBeingID - The name of the employee.
 * @param {Object!} ctx
 */
async function checkOwnership(owner, financialBeingID, ctx) {
  try {
    const financialBeing = await ctx.db.query.financialBeings({where: {id: financialBeingID}}, BEINGS_FRAGMENT);
    
    if (!financialBeing[0].team) {
      throw new GraphQLError('Something went wrong while getting team');
    }
    
    // TODO@Urk: change this when Teams API starts to function
    // const team = await getTeamByID(financialBeing[0].team);
    let team = await getAllTeams();
    
    team = _.filter(team.teams.edges, e => {
      return e.node.id === financialBeing[0].team;
    });
    
    if (!team) {
      throw new GraphQLError('Something went wrong while getting team');
    }
    
    const isSenderOwner = _.filter(team, e => {
      
      // TODO@Urk: change this when Teams API starts to function
      return e.node.owner.split('|')[1] === owner;
    });
    
    if (!isSenderOwner) {
      throw new GraphQLError('Unauthorized');
    }
    
    return isSenderOwner[0].node;
    
  } catch (e) {
    if (e.__proto__.name !== 'GraphQLError') {
      logger.log({level: 'error', message: e.message});
      
      throw new GraphQLError('Something went wrong while getting Financial Beings');
    }
    
    throw e;
  }
}

async function checkFinancialBeingOwnership(messageSender, financialBeingID, ctx) {
  try {
    const financialBeing = await ctx.db.query.financialBeings({where: {id: financialBeingID}}, BEINGS_FRAGMENT);
    
    if (financialBeing[0].owner === messageSender) {
      return financialBeing[0];
    }
    
  } catch (e) {
    logger.log({level: 'error', message: e.message});
    throw new GraphQLError('Something went wrong while getting Financial Beings');
  }
}

async function checkTeamOwnership(messageSender, teamID) {
  
  try {
    // TODO@Urk: change this when Teams API starts to function
    // const team = await getTeamByID(financialBeing[0].team);
    // let team = await getAllTeams();
    let team = __teams;
    
    team = _.filter(team.teams.edges, e => {
      return e.node.id === teamID;
    });
    
    if (!team) {
      throw new GraphQLError('Something went wrong while getting team');
    }
    
    const isSenderOwner = _.filter(team[0].node.members, e => {
      if (e.role === 'OWNER') {
        return e.member.authId.split('|')[1] === messageSender;
      }
    });
    
    if (isSenderOwner < 1 || !isSenderOwner) {
      return false;
    }
    
    return team[0].node;
  } catch (e) {
    logger.log({level: 'error', message: e.message});
    throw new GraphQLError('Something went wrong while getting Financial Beings');
  }
}

async function checkTeamMembership(memberToCheck, teamID) {
  try {
    // let team = await getAllTeams();
    let team = __teams;
    
    team = _.filter(team.teams.edges, e => {
      return e.node.id === teamID;
    });
    
    if (!team) {
      throw new GraphQLError('Something went wrong while getting team');
    }
    
    const isMember = _.filter(team[0].node.members, e => {
      return e.member.authId.split('|')[1] === memberToCheck;
    });
    
    if (isMember < 1 || !isMember) {
      return false;
    }
    
    
    return isMember;
  } catch (e) {
    logger.log('error', e);
    throw new GraphQLError('Unauthorized');
  }
}

function removeFalseyValues(object) {
  for (const key in object) {
    if (object.hasOwnProperty(key) && !object[key]) delete object[key];
  }
  return object;
}

module.exports = {
  checkOwnership: checkOwnership,
  removeFalseyValues: removeFalseyValues,
  checkTeamOwnership: checkTeamOwnership,
  checkFinancialBeingOwnership: checkFinancialBeingOwnership,
  checkTeamMembership: checkTeamMembership
};
