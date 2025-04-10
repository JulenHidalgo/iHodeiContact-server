const db = require("../config/db");

class Preview {
  constructor(id, titulo, contenido_id) {
    this.id = id;
    this.titulo = titulo;
    this.contenido_id = contenido_id;
  }

  static fromRow(row) {
    return new Preview(row.id, row.titulo, row.contenido_id);
  }

  static async getAll() {
    const [rows] = await db.query(
      "SELECT * FROM vista_preview ORDER BY id DESC"
    );
    return rows.map(Preview.fromRow);
  }

  static async getByIdForDelete(id) {
    const [rows] = await db.query(
      "SELECT * FROM vista_preview WHERE id = ? AND contenido_id IS NULL",
      [id]
    );
    return rows.length ? Preview.fromRow(rows[0]) : null;
  }
}

// Exportar la clase para que pueda ser utilizada en otros módulos
module.exports = Preview;
