describe('Flujo completo y gestión de equipo favorito en Perfil', () => {
  const usuario = 'ricardo';
  const contrasena = '1234';
  const equipo = 'Barcelona';

  it('Login, navegación Contacto → Ajustes → Perfil y gestión de equipo favorito', () => {
    // 🌐 Inicio de la app
    cy.visit('http://localhost:8100');

    // 🔐 Login
    cy.get('ion-input[formcontrolname="usuario"]').find('input').type(usuario);
    cy.get('ion-input[formcontrolname="password"]').find('input').type(contrasena);
    cy.contains('Ingresar').click();
    cy.wait(2000);

    // 🏠 Home
    cy.url().should('include', '/home');
    cy.contains(`Bienvenido, ${usuario}`).should('exist');
    cy.wait(2500);

    // 📬 Ir a Contacto
    cy.contains('Contacto').should('be.visible').click();
    cy.url().should('include', '/contacto');
    cy.contains('Contacto').should('exist');
    cy.wait(2500);

    // ⚙️ Ir a Ajustes — usando data-cy para estabilidad
    cy.get('[data-cy="btn-ajustes-contacto"]')
      .should('be.visible')
      .click();
    cy.url().should('include', '/ajustes');
    cy.contains('Ajustes').should('exist'); 
    cy.wait(2500);

    // 👤 Ir a Perfil — filtrando por vista activa
    cy.get('[data-cy="btn-perfil-ajustes"]')
      .should('be.visible')
      .click();
    cy.url().should('include', '/perfil');
    cy.contains('Mi Perfil').should('exist');
    cy.wait(2500);

    // ⭐ Agregar equipo favorito
    cy.get('ion-select').click();
    cy.get('.select-interface-option').contains(equipo).click();
    cy.contains('OK').click();
    cy.wait(2500);
    cy.contains('Tu equipo favorito actual').should('exist');
    cy.contains(equipo).should('exist');

    // ❌ Eliminar equipo favorito
    cy.get('.equipo-item')
      .contains(equipo)
      .parent()
      .find('ion-button')
      .contains('Eliminar')
      .click();
    cy.wait(1000);
    cy.contains('Todavía no agregaste equipos favoritos').should('exist');
  });
});