document.getElementById('formulario').addEventListener('submit', async function(e) {
  e.preventDefault();

  const WEBHOOK_URL = 'https://discord.com/api/webhooks/1386088345641418863/23OGzrBBayaGAn0EgJ87LfjQ8DzswBYkOw_3pCt-O7g71ptbtDva6ow0K4GNq9xH8EBw';

  const dados = {
    nome: document.getElementById('nome').value,
    idade: document.getElementById('idade').value,
    nif: document.getElementById('nif').value,
    registo: document.getElementById('registo').value,
    estado: document.getElementById('estado').value,
    discord: document.getElementById('discord').value,
    perguntas: []
  };

  for (let i = 1; i <= 12; i++) {
    const resposta = document.getElementById(`pergunta${i}`).value;
    dados.perguntas.push({ num: i, texto: resposta });
  }

  const mensagem = {
    username: "Nova Candidatura 💼",
    embeds: [
      {
        title: "📥 Nova Candidatura Recebida!",
        color: 0xFF69B4,
        fields: [
          { name: "👤 Nome", value: dados.nome, inline: true },
          { name: "🔞 Idade", value: dados.idade, inline: true },
          { name: "🆔 NIF", value: dados.nif, inline: true },
          { name: "📄 Registo Criminal", value: dados.registo, inline: true },
          { name: "💍 Estado Civil", value: dados.estado, inline: true },
          { name: "💬 ID Discord", value: dados.discord, inline: true },
          { name: "📋 Respostas", value: dados.perguntas.map(p => `**${p.num}.** ${p.texto}`).join('\n\n') }
        ],
        footer: {
          text: "Vanilla Unicorn • Candidaturas"
        },
        timestamp: new Date()
      }
    ]
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mensagem)
    });

    if (res.ok) {
      document.getElementById('mensagem').textContent = "✅ Candidatura enviada com sucesso!";
      document.getElementById('formulario').reset();
    } else {
      throw new Error('Erro ao enviar.');
    }
  } catch (err) {
    console.error(err);
    document.getElementById('mensagem').textContent = "❌ Erro ao enviar. Tenta novamente mais tarde.";
  }
});
