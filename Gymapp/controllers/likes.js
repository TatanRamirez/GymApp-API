const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = process.env;

function authenticateUser(req, res, next) {
  // Obtener el token de la cabecera de autorización (Bearer Token)
  const token = req.header('Authorization');

  // Verificar si se proporcionó el token en la cabecera
  if (!token) {
    return res
      .status(401)
      .json({ error: 'Token de autenticación no proporcionado' });
  }

  try {
    // Verificar y decodificar el token JWT
    const decodedToken = jwt.verify(token.replace('Bearer ', ''), secretKey);

    // Asegurarnos de que el token tenga la información necesaria
    if (!decodedToken || !decodedToken.userId || !decodedToken.role) {
      return res.status(401).json({ error: 'Token de autenticación inválido' });
    }

    // Agregar el usuario y su rol a la solicitud para que otras rutas lo utilicen
    req.user = {
      id: decodedToken.userId,
      role: decodedToken.role,
    };

    // Continuar con el siguiente middleware o ruta
    next();
  } catch (err) {
    // Si ocurre algún error al verificar el token, responder con un error de autenticación
    return res.status(401).json({ error: 'Token de autenticación inválido' });
  }
}

// Ruta para dar "like" a una publicación
router.post(
  '/activities/:activityId/like',
  authenticateUser,
  async (req, res) => {
    const activityId = req.params.activityId;
    const userId = req.user.id;

    try {
      const conn = await pool.getConnection();

      // Verificar si el usuario pertenece al grupo específico que puede dar "like"
      const [user] = await conn.execute('SELECT * FROM users WHERE id = ?', [
        userId,
      ]);
      if (!user || user.role !== 'Cliente') {
        conn.release();
        return res
          .status(403)
          .json({ error: 'Usuario no autorizado para dar "like"' });
      }

      // Verificar si el usuario ya dio "like" a la publicación previamente
      const [activity] = await conn.execute(
        'SELECT * FROM activities WHERE id = ?',
        [activityId]
      );
      if (!activity) {
        conn.release();
        return res.status(404).json({ error: 'Publicación no encontrada' });
      }

      if (activity.likes.includes(userId)) {
        conn.release();
        return res
          .status(400)
          .json({ error: 'El usuario ya dio "like" a esta publicación' });
      }

      // Agregar el "like" en la base de datos
      await conn.execute(
        'INSERT INTO likes (user_id, activity_id) VALUES (?, ?)',
        [userId, activityId]
      );

      conn.release();
      res.json({
        message: 'El usuario dio "like" a la publicación exitosamente',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
);

// Ruta para quitar "like" a una publicación
router.post(
  '/activities/:activityId/unlike',
  authenticateUser,
  async (req, res) => {
    const activityId = req.params.postId;
    const userId = req.user.id;

    try {
      const conn = await pool.getConnection();

      // Verificar si el usuario pertenece al grupo específico que puede quitar "like"
      const [user] = await conn.execute('SELECT * FROM users WHERE id = ?', [
        userId,
      ]);
      if (!user || user.role !== 'Cliente') {
        conn.release();
        return res
          .status(403)
          .json({ error: 'Usuario no autorizado para quitar "like"' });
      }

      // Verificar si el usuario ya dio "like" a la publicación previamente
      const [activity] = await conn.execute(
        'SELECT * FROM activities WHERE id = ?',
        [activityId]
      );
      if (!activity) {
        conn.release();
        return res.status(404).json({ error: 'Publicación no encontrada' });
      }

      if (!activity.likes.includes(userId)) {
        conn.release();
        return res.status(400).json({
          error: 'El usuario no dio "like" a esta publicación previamente',
        });
      }

      // Eliminar el "like" de la base de datos
      await conn.execute(
        'DELETE FROM likes WHERE user_id = ? AND activity_id = ?',
        [userId, activityId]
      );

      conn.release();
      res.json({
        message: 'El usuario quitó "like" de la publicación exitosamente',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
);

module.exports = router;
