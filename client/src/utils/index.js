export const formatDate = (date) => {
    // const mois = date.toLocaleString("fr-MA",{mois:"short"});
    const mois = date.toLocaleString("fr-MA",{month:"short"});

    const jour = date.getDate();
    const annee = date.getFullYear();
    const dateformate = `${jour}-${mois}-${annee}`;

    return dateformate;
}

export function dateFormater(dateString){
    const inputDate = new Date(dateString);
    if(isNaN(inputDate)){
        return 'Date invalide';
    }
    const mois = String(inputDate.getMonth()+1).padStart(2,"0");
    const jour = String(inputDate.getDate()).padStart(2,"0");
    const annee = inputDate.getFullYear();
    const dateformate = `${jour}-${mois}-${annee}`;
    return dateformate;
}


export function getInitials(nom){
    
    const names = nom.split(" ");
    const initials = names.slice(0,2).map((name) => name[0].toUpperCase());
    const initialsStr = initials.join("");
    return initialsStr;

    //   const names = nom;
    //   const initials = names
    //   return initials;
}

export const stylesprioritetaches = {
    eleve: "text-red-600",
    moyenne: "text-yellow-600",
    faible: "text-blue-600"
};

export const tache_type = {
    "À faire": "bg-blue-600",
    "En cours": "bg-yellow-600",
    "Terminée": "bg-green-600"
};

export const backgrounds = [
    "bg-blue-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-green-600"
];