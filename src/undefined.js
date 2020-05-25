"use strict"

function addStrings (string1, string2) {
    return string1 + " " + string2
}

const visitor = {
    name: 'Porche 911',
	age: 19,
	date: new Date('01/08/2000'),
	time: '08:00:00',
	assistant: 'Lebohang Mokoena',
	comments: 'Nomvelo'
}

const newVisitor = addStrings(
    visitor.name,
    visitor.comments
)

console.log(newVisitor[newVisitor.length - 1])
console.log(newVisitor + " xolani")