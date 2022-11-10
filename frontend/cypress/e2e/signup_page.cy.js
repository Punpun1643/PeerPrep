describe('Signup page', () => {
    const validNewUser = {
        username: 'newUser',
        password: 'newPassword1'
    }

    const invalidNewUser = {
        username: 'newUser',
        password: 'invalid'
    }

    // remember needs to connect to DB

    it('successfully loads', () => {
        cy.visit('http://localhost:3000');
    });

    it('throw correct error when not connected to database', () => {
        cy.visit('http://localhost:3000/signup');

        cy.get('.userInputUsername')
            .type(validNewUser.username);

        cy.get('.userInputPassword')
            .type(validNewUser.password);
        // error pops up should exist
        
    });

    it('captures that password is invalid', () => {
        cy.visit('http://localhost:3000/signup');

        cy.get('.userInputUsername')
            .type(invalidNewUser.username);

        cy.get('.userInputPassword')
            .type(invalidNewUser.password);
        // error pops up should exist

        cy.get('.userInputPassword')
            .contains('Password should contain at least one number and one alphabet, and must be at least 8 characters');
        
    });

    it('directs to login', () => {
        cy.visit('http://localhost:3000/signup');

        cy.get('.loginLink')
            .click();

        cy.url().should('include', '/login')  
    });
});