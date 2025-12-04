const { empresa, servico, porte_servico, porte, endereco } = require('../src/models');

async function criarEmpresaTeste() {
  try {
    console.log('Criando empresa de teste...');
    
    // 1. Criar empresa
    const empresaTeste = await empresa.create({
      nome: 'PetShop PetDay',
      telefone: '99999999999'
    });
    
    console.log(`✅ Empresa criada: ${empresaTeste.nome} (ID: ${empresaTeste.empresa_id})`);
    
    // 2. Criar endereço
    await endereco.create({
      tipo_entidade: 'empresa',
      entidade_id: empresaTeste.empresa_id,
      cidade: 'Maringá',
      rua: 'Rua das Flores',
      numero: '123',
      bairro: 'Jardins',
      complemento: 'Sala 1',
      estado: 'PR',
      cep: '00000-000'
    });
    
    console.log('✅ Endereço criado');
    
    // 3. Criar serviços
    const servicos = [
      {
        tipo: 'Banho Completo',
        descricao: 'Banho com produtos premium e secagem',
        duracao_min: 60,
        preco_pequeno: 30.00,
        preco_medio: 40.00,
        preco_grande: 50.00
      },
      {
        tipo: 'Tosa Higiênica',
        descricao: 'Tosa na região íntima, patas e rosto',
        duracao_min: 45,
        preco_pequeno: 25.00,
        preco_medio: 35.00,
        preco_grande: 45.00
      },
      {
        tipo: 'Vacinação',
        descricao: 'Aplicação de vacinas V8/V10',
        duracao_min: 30,
        preco_pequeno: 60.00,
        preco_medio: 70.00,
        preco_grande: 80.00
      }
    ];
    
    const portes = await porte.findAll();
    
    for (const servicoData of servicos) {
      const novoServico = await servico.create({
        empresa_id: empresaTeste.empresa_id,
        tipo: servicoData.tipo,
        descricao: servicoData.descricao,
        duracao_min: servicoData.duracao_min,
        ativo: true,
        horaDisponivel: new Date()
      });
      
      // Criar preços para cada porte
      for (const porte of portes) {
        let preco = 0;
        if (porte.descricao === 'Pequeno') preco = servicoData.preco_pequeno;
        if (porte.descricao === 'Médio') preco = servicoData.preco_medio;
        if (porte.descricao === 'Grande') preco = servicoData.preco_grande;
        
        await porte_servico.create({
          servico_id: novoServico.servico_id,
          porte_id: porte.porte_id,
          preco_porte: preco
        });
      }
      
      console.log(`✅ Serviço criado: ${servicoData.tipo}`);
    }
    
    console.log('=========================================');
    console.log('🎉 EMPRESA DE TESTE CRIADA COM SUCESSO!');
    console.log('=========================================');
    console.log(`ID da Empresa: ${empresaTeste.empresa_id}`);
    console.log(`Nome: ${empresaTeste.nome}`);
    console.log(`Telefone: ${empresaTeste.telefone}`);
    console.log('Endereço: Rua das Flores, 123 - Jardins, São Paulo - SP');
    console.log('Serviços: Banho Completo, Tosa Higiênica, Vacinação');
    console.log('=========================================');
    
    return empresaTeste;
    
  } catch (error) {
    console.error('❌ Erro ao criar empresa de teste:', error);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  criarEmpresaTeste()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = criarEmpresaTeste;