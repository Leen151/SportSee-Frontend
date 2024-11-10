/**
 * Dans la mesure où la route pour avoir la liste de tous les users 
 * n'est pas disponible depuis l'api,
 * les données seront récupérées depuis le fichier json
 */
async function getUsers(){  
  try {
    const response = await fetch("/dataUser.json");
    
    if (!response.ok) {
      throw new Error(`(Erreur ${response.status}) : Erreur lors de la récupération des données.`);
    }
    const users = await response.json();
    return users;

  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
}


async function getUserById(id) {
  try {
    const response = await fetch(`http://localhost:3000/user/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erreur ${response.status} : utilisateur ${id} non trouvé`);
    }

    const datas = await response.json();
    const user = datas.data;
    return user;
    
  } catch (error) {
    console.error("Erreur dans getUserById:", error);
    throw error;
  }
}

async function getActivityByUserId(id){
  try {
    const response = await fetch(`http://localhost:3000/user/${id}/activity`);
    
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: données d'activité de l'utilisateur ${id} non trouvées`);
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
      throw new Error(`Erreur ${response.status}: performances de l'utilisateur ${id} non trouvées`);
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
      throw new Error(`Erreur ${response.status}: sessions de l'utilisateur ${id} non trouvées`);
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