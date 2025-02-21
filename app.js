// Configuração do Firebase (substitua com suas credenciais)
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJECT_ID.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_PROJECT_ID.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Salva os dados no Firestore
document.getElementById('horasForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const horas = document.getElementById('horas').value;
    const descricao = document.getElementById('descricao').value;

    db.collection('horas').add({
        horas: horas,
        descricao: descricao
    }).then(() => {
        alert('Horas salvas com sucesso!');
        carregarHoras();
    }).catch((error) => {
        console.error("Erro ao salvar dados: ", error);
    });
});

// Carrega os dados do Firestore
function carregarHoras() {
    const lista = document.getElementById('horasList');
    lista.innerHTML = '';

    db.collection('horas').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const item = document.createElement('li');
            item.textContent = `Horas: ${data.horas}, Descrição: ${data.descricao}`;
            lista.appendChild(item);
        });
    });
}

// Carrega as horas ao abrir a página
carregarHoras();