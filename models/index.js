var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack'); //has to be at 5432 because this is the default port for postgres

var Page = db.define('page', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	status: {
		type: Sequelize.ENUM('open', 'closed')
	},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	route: {
		type: Sequelize.STRING,
		get: function(){
			var route = this.getDataValue('urlTitle');
			return '/wiki/' + route;
		}
	}
});

Page.hook('beforeValidate', function generateUrlTitle (instance) {
  if (instance) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    var titleStr = instance.title;
    instance.urlTitle = titleStr.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    instance.urlTitle = Math.random().toString(36).substring(2, 7);
  }
});

var User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true,
			notEmpty: true
		}
	}
})

Page.belongsTo(User, { as: 'author'});

module.exports = {
	db: db,
	Page: Page,
	User: User
};