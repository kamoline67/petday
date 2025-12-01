import React, { useState } from 'react';
import api from '../../services/api';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import Input from '../UI/Input';

const ServicoCard = ({ servico, empresa, onAgendamentoCriado }) => {
    const [modalAberto, setModalAberto] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState('');
    
    const [dadosAgendamento, setDadosAgendamento] = useState({
        pet_id: '',
        data_hora: '',
        transporte: false,
        forma_pagamento: 'Pix'
    });

    const [pets, setPets] = useState([]);

    const abrirModal = async () => {
        try {
            const response = await api.get('/pets');
            setPets(response.data.pets || []);
            setModalAberto(true);
        } catch (error) {
            setMensagem('Erro ao carregar pets');
        }
    };

    const criarAgendamento = async (e) => {
        e.preventDefault();
        setCarregando(true);

        try {
            const agendamentoData = {
                cliente_id: servico.usuario?.cliente_id, // Ajuste conforme sua estrutura
                pet_id: dadosAgendamento.pet_id,
                data_hora: dadosAgendamento.data_hora,
                transporte: dadosAgendamento.transporte,
                servicos: [{ servico_id: servico.servico_id }],
                forma_pagamento: dadosAgendamento.forma_pagamento
            };

            const response = await api.post(`/agendamentos/${empresa.empresa_id}`, agendamentoData);
            
            setMensagem('Agendamento realizado com sucesso!');
            setModalAberto(false);
            
            if (onAgendamentoCriado) {
                onAgendamentoCriado(response.data.agendamento);
            }
        } catch (error) {
            setMensagem(error.response?.data?.error || 'Erro ao realizar agendamento');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <>
            <div className="border-2 border-neutral-200 rounded-2xl p-6 hover:border-primary-300 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-secondary-500 mb-1">
                            {servico.tipo}
                        </h3>
                        <p className="text-neutral-600 text-sm">
                            {servico.descricao}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary-500">
                            R$ {servico.portes?.[0]?.preco_porte || '0.00'}
                        </div>
                        <div className="text-sm text-neutral-500">
                            {servico.duracao_min} min
                        </div>
                    </div>
                </div>
                
                <Button 
                    onClick={abrirModal}
                    className="w-full"
                >
                    Agendar Agora
                </Button>
            </div>

            {/* Modal de Agendamento Rápido */}
            <Modal
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
                title="Finalizar Agendamento"
                size="md"
            >
                <form onSubmit={criarAgendamento} className="space-y-6">
                    {mensagem && (
                        <div className={`p-4 rounded-2xl text-lg font-semibold ${
                            mensagem.includes('Erro') 
                                ? 'bg-red-50 text-red-700 border-2 border-red-200' 
                                : 'bg-green-50 text-green-700 border-2 border-green-200'
                        }`}>
                            {mensagem}
                        </div>
                    )}

                    <div>
                        <label className="block text-lg font-semibold text-secondary-500 mb-2">
                            Selecione o Pet
                        </label>
                        <select
                            value={dadosAgendamento.pet_id}
                            onChange={(e) => setDadosAgendamento({...dadosAgendamento, pet_id: e.target.value})}
                            className="input-primary"
                            required
                        >
                            <option value="">Escolha um pet</option>
                            {pets.map(pet => (
                                <option key={pet.pet_id} value={pet.pet_id}>
                                    {pet.nome} ({pet.especie}) - {pet.porte?.descricao}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Input
                        label="Data e Horário"
                        type="datetime-local"
                        value={dadosAgendamento.data_hora}
                        onChange={(e) => setDadosAgendamento({...dadosAgendamento, data_hora: e.target.value})}
                        required
                    />

                    <div className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-2xl">
                        <input
                            type="checkbox"
                            id="transporte"
                            checked={dadosAgendamento.transporte}
                            onChange={(e) => setDadosAgendamento({...dadosAgendamento, transporte: e.target.checked})}
                            className="w-5 h-5 text-primary-500 rounded focus:ring-primary-300"
                        />
                        <label htmlFor="transporte" className="text-lg font-semibold text-secondary-500 cursor-pointer">
                            🚗 Necessita transporte?
                        </label>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-secondary-500 mb-2">
                            Forma de Pagamento
                        </label>
                        <select
                            value={dadosAgendamento.forma_pagamento}
                            onChange={(e) => setDadosAgendamento({...dadosAgendamento, forma_pagamento: e.target.value})}
                            className="input-primary"
                            required
                        >
                            <option value="Pix">📱 Pix</option>
                            <option value="Cartão">💳 Cartão</option>
                            <option value="Dinheiro">💵 Dinheiro</option>
                        </select>
                    </div>

                    {/* Resumo do Pedido */}
                    <div className="bg-primary-50 rounded-2xl p-4">
                        <h4 className="font-semibold text-secondary-500 mb-2">Resumo do Pedido</h4>
                        <div className="flex justify-between items-center">
                            <span>{servico.tipo}</span>
                            <span className="font-bold text-primary-500">
                                R$ {servico.portes?.[0]?.preco_porte || '0.00'}
                            </span>
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        disabled={carregando}
                        loading={carregando}
                        className="w-full"
                    >
                        Confirmar Agendamento e Pagamento
                    </Button>
                </form>
            </Modal>
        </>
    );
};

export default ServicoCard;