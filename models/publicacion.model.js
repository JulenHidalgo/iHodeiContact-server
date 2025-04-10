const db = require("../config/db");

class Publicacion {
  constructor(id, titulo, texto) {
    this.id = id;
    this.titulo = titulo;
    this.texto = texto;
  }

  static fromRow(row) {
    return new Publicacion(row.id, row.titulo, row.texto);
  }

  static async getAll() {
    const [rows] = await db.query("SELECT * FROM publicacion");
    return rows.map(Publicacion.fromRow);
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM publicacion WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      throw new Error("Publicación no encontrada");
    }
    return rows.map(Publicacion.fromRow);
  }

  static async postPublicacion(titulo, texto) {
    const insertQuery = "INSERT INTO publicacion (titulo, texto) VALUES (?, ?)";
    const params = [titulo, texto];
    await db.query(insertQuery, params);

    const [rows] = await db.query(
      "SELECT * FROM publicacion WHERE id = LAST_INSERT_ID()"
    );
    return rows.map(Publicacion.fromRow)[0];
  }

  static async deletePublicacion(id) {
    const deleteQuery = "DELETE FROM publicacion WHERE id = ?";
    const params = [id];
    await db.query(deleteQuery, params);
  }
}

// Exportar la clase para que pueda ser utilizada en otros módulos
module.exports = Publicacion;
