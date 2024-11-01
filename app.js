class Agente {
    constructor(nombre, rol, habilidades, imagen) {
        this.nombre = nombre;
        this.rol = rol;
        this.habilidades = habilidades;
        this.imagen = imagen;
    }
}

async function getAgents() {
    try {
        const response = await fetch('https://valorant-api.com/v1/agents');
        const data = await response.json();
        const agents = data.data.map(agent => {
            return new Agente(
                agent.displayName,
                agent.role ? agent.role.displayName : "Unknown",
                agent.abilities.map(ability => ability.displayName),
                agent.displayIcon
            );
        });
        return agents;
    } catch (error) {
        console.error("Error fetching agents:", error);
    }
}

function renderAgents(agents) {
    const container = document.getElementById("agentsContainer");
    container.innerHTML = ''; // Limpiar el contenedor

    agents.forEach(agent => {
        const agentDiv = document.createElement('div');
        agentDiv.className = 'agent';

        agentDiv.innerHTML = `
            <img src="${agent.imagen}" alt="${agent.nombre}">
            <h2>${agent.nombre}</h2>
            <p><strong>Rol:</strong> ${agent.rol}</p>
            <p><strong>Habilidades:</strong> ${agent.habilidades.join(", ")}</p>
        `;

        container.appendChild(agentDiv);
    });
}

document.getElementById("searchInput").addEventListener("input", (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredAgents = agents.filter(agent =>
        agent.nombre.toLowerCase().includes(searchQuery)
    );
    renderAgents(filteredAgents);
});

let agents = [];

window.onload = async () => {
    agents = await getAgents();
    renderAgents(agents);
};
