// Função para buscar informações do IP
async function fetchIPInfo() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();

        // Remove o spinner
        document.getElementById('spinner').style.display = 'none';

        // Obter clientPort e timestamp dos atributos data-
        const clientIP = document.body.dataset.clientIp;
        const clientPort = document.body.dataset.clientPort;
        const timestamp = document.body.dataset.timestamp;

        // Monta as linhas da tabela
        const tableBody = document.getElementById('ipInfoTable');

        // Adiciona IP do Cliente
        const clientIPRow = document.createElement('tr');
        clientIPRow.innerHTML = `
            <td class="py-2 px-4 font-semibold">IP do Cliente</td>
            <td class="py-2 px-4">${clientIP}</td>
        `;
        tableBody.appendChild(clientIPRow);

        // Adiciona Porta de Origem
        const sourcePortRow = document.createElement('tr');
        sourcePortRow.innerHTML = `
            <td class="py-2 px-4 font-semibold">Porta de Origem</td>
            <td class="py-2 px-4">${clientPort}</td>
        `;
        tableBody.appendChild(sourcePortRow);

        // Adiciona Timestamp
        const timestampRow = document.createElement('tr');
        timestampRow.innerHTML = `
            <td class="py-2 px-4 font-semibold">Timestamp</td>
            <td class="py-2 px-4">${timestamp}</td>
        `;
        tableBody.appendChild(timestampRow);

        // Cria uma quebra de linha estilizada para separar as informações
        const separatorRow = document.createElement('tr');
        separatorRow.innerHTML = `
            <td colspan="2"><hr class="my-2 ml-2 mr-2 border-t-1 border-gray-500 border-dashed"></td>`;
        tableBody.appendChild(separatorRow);

        // Campos a serem exibidos com seus respectivos aliases
        const fieldsToDisplay = {
            city: 'Cidade',
            country: 'País',
            loc: 'Localização',
            org: 'Organização',
            postal: 'CEP',
            region: 'Estado',
            timezone: 'Zona',
        };

        // Itera sobre os campos a serem exibidos
        for (const [key, alias] of Object.entries(fieldsToDisplay)) {
            const value = data[key];
            if (value !== undefined) {
                const row = document.createElement('tr');
                let displayValue = value;

                // Adiciona bandeira se for o país
                if (key === 'country') {
                    const flagUrl = `https://flagcdn.com/32x24/${value.toLowerCase()}.png`;
                    displayValue = `${value} <img src="${flagUrl}" alt="${value} flag" class="inline-block ml-2">`;
                }

                // Formata a localização como link para o mapa, se for o campo "loc"
                if (key === 'loc') {
                    const [latitude, longitude] = value.split(',');
                    const mapUrl = `https://www.google.com/maps/@${latitude},${longitude},15z`;
                    displayValue = `<a href="${mapUrl}" target="_blank" class="text-blue-500 hover:underline">${value}</a>`;
                }

                row.innerHTML = `
                    <td class="py-2 px-4 font-semibold">${alias}</td>
                    <td class="py-2 px-4">${displayValue}</td>
                `;
                tableBody.appendChild(row);
            }
        }

        // Exibe o card
        document.getElementById('ipInfoCard').classList.remove('hidden');
    } catch (error) {
        console.error('Erro ao buscar informações do IP:', error);
    }
}

// Função para capitalizar a primeira letra
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Funções de tema
function toggleTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function loadTheme() {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    toggleTheme(defaultTheme);
    document.getElementById('themeSwitch').checked = defaultTheme === 'dark';
}

document.getElementById('themeSwitch').addEventListener('change', function() {
    const theme = this.checked ? 'dark' : 'light';
    toggleTheme(theme);
});

// Ao carregar a página
window.onload = function() {
    loadTheme();
    fetchIPInfo();
};
