/// <reference types="Cypress" />

describe('Authentication Page', () => {
    
    beforeEach(()=> {
        cy.visit('/');
    });
    
    it('should display the right view', ()=>{
        cy.contains('Social Authentication');
        cy.contains('Login or Register with:');
        cy.contains('SignIn with Google');
    });
});