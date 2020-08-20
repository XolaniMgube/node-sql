notes to self

.env file should be in the src folder and reference from there. Another .env in the root folder but nothing referenced to it to be able to run the queries outside of the src file.
Example: running jasmine from the root folder.

on spec/support/jasmine.json.... Make the random property to false so that it does not give different results each time I run jasmine.
