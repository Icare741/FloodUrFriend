exports.shareMedia = async (req, res) => {
    try {
      // Logique de partage de média
      res.status(200).json({ message: 'Média partagé avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };