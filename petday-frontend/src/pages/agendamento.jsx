// pages/agendamento.js - ATUALIZADA
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Loading from '../components/UI/Loading';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const Agendamento = ({ usuario, onLogout, onNavigateTo }) => {
    const [carregando, setCarregando] = useState(false);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        carregarAgendamentos();
    }, []);

    const carregarAgendamentos = async () => {
        try {
            const response = await api.get(`/agendamentos/cliente/${usuario.cliente_id}`);
            setAgendamentos(response.data.agendamentos || []);
        } catch (error) {
            setMensagem('Erro ao carregar agendamentos');
        } finally {
            setCarregandoDados(false);
        }
    };

    const cancelarAgendamento = async (agendamentoId) => {
        if (!window.confirm('Tem certeza que deseja cancelar este agendamento?')) return;

        try {
            await api.put(`/agendamentos/${agendamentoId}`, { status: 'Cancelado' });
            setMensagem('Agendamento cancelado com sucesso!');
            carregarAgendamentos();
        } catch (error) {
            setMensagem('Erro ao cancelar agendamento');
        }
    };

    const formatarData = (dataString) => {
        return new Date(dataString).toLocaleString('pt-BR');
    };

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    const getStatusColor = (status) => {
        const cores = {
            'Agendado': 'bg-blue-100 text-blue-700 border-blue-200',
            'Confirmado': 'bg-green-100 text-green-700 border-green-200',
            'Em Andamento': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'Finalizado': 'bg-neutral-100 text-neutral-700 border-neutral-200',
            'Cancelado': 'bg-red-100 text-red-700 border-red-200'
        };
        return cores[status] || 'bg-neutral-100 text-neutral-700 border-neutral-200';
    };

    const getStatusPagamentoColor = (status) => {
        const cores = {
            'Pago': 'bg-green-100 text-green-700 border-green-200',
            'Pendente': 'bg-yellow-100 text-yellow-700 border-yellow-200'
        };
        return cores[status] || 'bg-neutral-100 text-neutral-700 border-neutral-200';
    };

    if (carregandoDados) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <Loading mensagem="Carregando seus agendamentos..." tamanho="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            
            <div className="section-padding">
                <div className="container-custom">

                    <div className="text-center mb-12">
                        <h1 className="text-display display-sm text-secondary-500 mb-4">
                            Meus <span className="text-primary-500">Agendamentos</span>
                        </h1>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            Acompanhe todos os seus agendamentos e pagamentos em um só lugar
                        </p>
                    </div>

                    {mensagem && (
                        <div className={`mb-8 p-4 rounded-2xl text-lg font-semibold ${
                            mensagem.includes('Erro') 
                                ? 'bg-red-50 text-red-700 border-2 border-red-200' 
                                : 'bg-green-50 text-green-700 border-2 border-green-200'
                        }`} >
                            {mensagem}
                        </div>
                    )}

                    <Card padding="xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-display font-bold text-secondary-500">
                                Histórico de Agendamentos
                            </h2>
                            <div className="text-lg text-neutral-600">
                                Total: <span className="font-bold text-primary-500">{agendamentos.length}</span>
                            </div>
                        </div>
                        
                        {agendamentos.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📅</div>
                                <h3 className="text-xl font-semibold text-secondary-500 mb-2">
                                    Nenhum agendamento encontrado
                                </h3>
                                <p className="text-neutral-600 mb-6">
                                    Que tal agendar seu primeiro serviço?
                                </p>
                                <Button 
                                    onClick={() => onNavigateTo('feed')}
                                    size="lg"
                                >
                                    Explorar Serviços
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {agendamentos.map(agendamento => (
                                    <Card key={agendamento.agendamento_id} hover padding="lg">
                                        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                                        
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-start justify-between mb-4 gap-4">
                                                    <div>
                                                        <h4 className="text-xl font-bold text-secondary-500 mb-1">
                                                            {formatarData(agendamento.data_hora)}
                                                        </h4>
                                                        <p className="text-neutral-600">
                                                            {agendamento.pet?.nome} • {agendamento.endereco_atendimento}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="flex flex-col items-end gap-2">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(agendamento.status)}`}>
                                                            {agendamento.status}
                                                        </span>
                                                        
                                                        {/* Status do Pagamento */}
                                                        {agendamento.pagamento && (
                                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusPagamentoColor(agendamento.pagamento.status)}`}>
                                                                💳 {agendamento.pagamento.status}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                {/* Serviços */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {agendamento.servicos?.map((servico, index) => (
                                                        <span 
                                                            key={index}
                                                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium"
                                                        >
                                                            {servico.tipo} - {formatarMoeda(servico.agendamento_servico?.preco_unitario || 0)}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Informações de Pagamento */}
                                                {agendamento.pagamento && (
                                                    <div className="bg-neutral-50 rounded-2xl p-4">
                                                        <h5 className="font-semibold text-secondary-500 mb-2">
                                                            Informações de Pagamento
                                                        </h5>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                            <div>
                                                                <div className="text-neutral-500">Forma de Pagamento</div>
                                                                <div className="font-semibold text-secondary-500">
                                                                    {agendamento.pagamento.forma_pagamento}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-neutral-500">Valor Total</div>
                                                                <div className="font-semibold text-primary-500 text-lg">
                                                                    {formatarMoeda(agendamento.pagamento.valor)}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-neutral-500">Status</div>
                                                                <div className={`font-semibold ${agendamento.pagamento.status === 'Pago' ? 'text-green-500' : 'text-yellow-500'}`}>
                                                                    {agendamento.pagamento.status}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Ações */}
                                            <div className="flex flex-col space-y-3">
                                                {agendamento.status === 'Agendado' && (
                                                    <Button 
                                                        variant="outline"
                                                        onClick={() => cancelarAgendamento(agendamento.agendamento_id)}
                                                        className="bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600"
                                                    >
                                                        Cancelar Agendamento
                                                    </Button>
                                                )}
                                                
                                                {agendamento.pagamento?.status === 'Pendente' && (
                                                    <Button 
                                                        variant="outline"
                                                        onClick={() => {/* Função para pagar */}}
                                                        className="bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600"
                                                    >
                                                        Realizar Pagamento
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </Card>

                    {/* Estatísticas */}
                    {agendamentos.length > 0 && (
                        <Card padding="xl" className="mt-8 gradient-bg text-white">
                            <h3 className="text-xl font-display font-bold mb-6 text-center">
                                Resumo dos Agendamentos
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <div>
                                    <div className="text-3xl font-bold mb-1">{agendamentos.length}</div>
                                    <div className="text-primary-200">Total de Agendamentos</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold mb-1">
                                        {agendamentos.filter(a => a.status === 'Finalizado').length}
                                    </div>
                                    <div className="text-primary-200">Finalizados</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold mb-1">
                                        {agendamentos.filter(a => a.pagamento?.status === 'Pago').length}
                                    </div>
                                    <div className="text-primary-200">Pagamentos Confirmados</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold mb-1">
                                        {formatarMoeda(
                                            agendamentos
                                                .filter(a => a.pagamento?.status === 'Pago')
                                                .reduce((total, a) => total + parseFloat(a.pagamento?.valor || 0), 0)
                                        )}
                                    </div>
                                    <div className="text-primary-200">Total Pago</div>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Agendamento;