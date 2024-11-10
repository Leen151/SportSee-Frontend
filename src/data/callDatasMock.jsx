/**
 * Dans la mesure où la route pour avoir la liste de tous les users 
 * n'est pas disponible depuis l'api,
 * les données seront récupérées depuis le fichier json
 */
async function getUsers(){  
  try {
    const response = await fetch("/dataUser.json");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    const data = await response.json();

    return data; 

  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
}

// Version des appel fetch avec les données en Json
async function getUserById(id) {
  try {
    const response = await fetch("/dataUser.json");
    const data = await response.json();

    // Rechercher l'utilisateur correspondant à l'ID
    const user = data.find(user => user.id == id);

    if (!user) {
      throw new Error(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    return user; // Renvoie l'objet utilisateur trouvé
  } catch (error) {
    console.error("Erreur dans getUserById:", error);
    throw error; // Lance l'erreur pour être gérée dans le composant
  }
}

async function getActivityByUserId(id){
  try {
    const response = await fetch(`http://localhost:3000/user/${id}/activity`);
    
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: données d'activité de l'utilisateur ${id} non trouvés`);
    }

    const data = await response.json();
    const activityUser = data.data;

    return activityUser;
  } catch (error) {
    console.error("Erreur dans getActivityByUserId:", error);
    throw error;
  }
}

async function getPerformanceByUserId(id){
  try {
    const response = await fetch(`http://localhost:3000/user/${id}/performance`);
    
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: performance de l'utilisateur ${id} non trouvés`);
    }

    const data = await response.json();
    const performanceUser = data.data;

    return performanceUser;
  } catch (error) {
    console.error("Erreur dans getPerformanceByUserId:", error);
    throw error;
  }
}

async function getSessionsByUserId(id){
  try {
    const response = await fetch(`http://localhost:3000/user/${id}/average-sessions`);
    
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: sessions de l'utilisateur ${id} non trouvés`);
    }

    const data = await response.json();
    const sessionsUser = data.data;

    return sessionsUser;
  } catch (error) {
    console.error("Erreur dans getSessionsByUserId:", error);
    throw error;
  }
}

export { 
  getUsers, 
  getUserById, 
  getActivityByUserId, 
  getSessionsByUserId, 
  getPerformanceByUserId}