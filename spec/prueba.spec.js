const { Activity, Repository } = require("../scripts/models");

describe("Probando la clase Activity", () => {
    it("Debe ser una instancia de Activity", () => {
        const activity = new Activity();
        expect(activity instanceof Activity).toBe(true);
    });

    it("Es una clase", () => {
        const activity = new Activity();

        expect(typeof activity).toBe("object");
    });
});

describe("Probando la clase Repository", () => {
    let repository;
    beforeEach(() => {
        repository = new Repository();
    });

    it("Debe ser una instancia de Repository", () => {
        expect(repository instanceof Repository).toBe(true);
    });

    it("Debe contener los métodos getAllActivities, createActivity, deleteActivity", () => {
        expect(repository.getAllActivities).toBeDefined();
        expect(repository.createActivity).toBeDefined();
        expect(repository.deleteActivity).toBeDefined();
    });

    it("Debe agregar un elemento a la lista", () => {
        const ZERO = repository.getAllActivities().length;
        repository.createActivity(
            "titulo 1",
            "alguna description",
            "https://images/1"
        );

        expect(repository.getAllActivities().length > ZERO).toBeTrue();
    });

    it("Debe eliminar un elemento", () => {
        repository.createActivity(
            "titulo 1",
            "alguna description",
            "https://images/1"
        );
        repository.createActivity(
            "titulo 2",
            "alguna description",
            "https://images/1"
        );
        repository.createActivity(
            "titulo 3",
            "alguna description",
            "https://images/1"
        );
        const LENGTH_INITIAL = repository.getAllActivities().length;

        repository.deleteActivity(2);

        expect(
            repository.getAllActivities().length < LENGTH_INITIAL
        ).toBeTrue();
    });
});
