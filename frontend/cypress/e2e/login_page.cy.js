describe('Login page', () => {
    const validNewUser = {
        username: 'newUser',
        password: 'newPassword1'
    }

    // remember needs to connect to DB

    it('successfully loads', () => {
        cy.visit('http://localhost:3000');
    });

    it('throw correct error when not connected to database', () => {
        cy.visit('http://localhost:3000/login');

        cy.get('.userInputUsername')
            .type(validNewUser.username);

        cy.get('.userInputPassword')
            .type(validNewUser.password);

        cy.get('.loginButton')
            .click();

        // error pops up should exist
    });

    it('directs to signup', () => {
        cy.visit('http://localhost:3000/login');

        cy.get('.signupLink')
            .click();

        cy.url().should('include', '/signup')  
    });
});
