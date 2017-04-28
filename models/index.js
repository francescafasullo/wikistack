var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:1994/wikistack');

var Page = sequelize.define('page', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	}
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isUrl: true,
			notEmpty: true
		}
	}
	content: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	}
	status: {
		type: Sequelize.ENUM('open', 'closed')
	}
})

var User = sequelize.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	}
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true,
			notEmpty: true
		}
	}
})

module.exports = {
	Page: Page,
	User: User
};