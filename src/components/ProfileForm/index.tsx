import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClienteDTO } from 'models/cliente';
import clienteservice from 'services/clienteservice';
import estadoService from 'services/estadoservice';
import authservice from 'services/authservice';
import { EstadoDTO } from 'models/estado';
import { CidadeDTO } from 'models/cidade';

interface CadastroClienteFormProps {
  onSubmit: (clienteData: ClienteDTO) => void;
}

const CadastroClienteForm: React.FC<CadastroClienteFormProps> = ({ onSubmit }) => {
  const { id } = useParams<{ id: string }>();
  const [clienteData, setClienteData] = useState<ClienteDTO>({
    nome: '',
    email: '',
    cpfOuCnpj: '',
    tipo: 1, // Defina o valor padrão aqui (1 para Pessoa Física)
    enderecos: [
      {
        id: 0,
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cep: '',
        cidade: { id: 0, nome: '', estado: { id: 0, nome: '' } },
        cliente: {}, // Adicione a propriedade 'cliente' com valor nulo
      },
    ],
    telefones: [''],
  });
  const [selectedEstadoId, setSelectedEstadoId] = useState<number | undefined>(undefined);
  const [selectedCidade, setSelectedCidade] = useState<string | undefined>(undefined);
  const [cidades, setCidades] = useState<string[]>([]);
  const [estados, setEstados] = useState<EstadoDTO[]>([]);

  useEffect(() => {
    const user = authservice.getCurrentUser();
    if (id && user) {
      clienteservice.getProfile(Number(id))
        .then((clienteData) => {
          setClienteData(clienteData);
          setSelectedEstadoId(clienteData.enderecos?.[0]?.cidade.estado.id);
          setSelectedCidade(clienteData.enderecos?.[0]?.cidade.nome || '');
        })
        .catch((error) => {
          console.error('Erro ao carregar os dados do cliente:', error);
        });
    }
  }, [id]);

  useEffect(() => {
    estadoService.getEstados()
      .then((data) => {
        setEstados(data);
      })
      .catch((error) => {
        console.error('Erro ao carregar estados:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedEstadoId !== undefined) {
      estadoService
        .getCidadesPorEstado(selectedEstadoId)
        .then((data) => {
          const cidadeNomes = data.map((cidade: CidadeDTO) => cidade.nome);
          setCidades(cidadeNomes);
        })
        .catch((error) => {
          console.error('Erro ao carregar cidades:', error);
        });
    }
  }, [selectedEstadoId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (clienteData) {
      const { name, value } = e.target;
      setClienteData((prevClienteData) => ({
        ...prevClienteData,
        [name]: value,
      }));
    }
  };

  const handleCidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCidade(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (clienteData) {
      try {
        // Crie um novo objeto FormData
        const formData = new FormData();
  
        // Preencha o formData com os campos apropriados
        formData.append('id', clienteData.id ? clienteData.id.toString() : '');
        formData.append('nome', clienteData.nome || '');
        formData.append('email', clienteData.email || '');
        formData.append('cpfOuCnpj', clienteData.cpfOuCnpj || '');
        formData.append('tipo', clienteData.tipo ? clienteData.tipo.toString() : '');
  
        // Campos de endereço
        formData.append('logradouro', clienteData.enderecos?.[0]?.logradouro || '');
        formData.append('cep', clienteData.enderecos?.[0]?.cep || '');
        formData.append('complemento', clienteData.enderecos?.[0]?.complemento || '');
        formData.append('bairro', clienteData.enderecos?.[0]?.bairro || '');
  
        // Campos de cidade e estado
        formData.append('cidade', selectedCidade || '');
        formData.append('estado', selectedEstadoId ? selectedEstadoId.toString() : '');
  
        // Continue adicionando outros campos conforme necessário
  
        // Envie os dados atualizados para o servidor usando o serviço clienteservice
        await clienteservice.updateProfile(Number(id), formData);
  
        // Chame a função onSubmit com a cópia atualizada
        onSubmit(clienteData);
  
        // Redirecione ou realize outras ações após a atualização bem-sucedida
        // Por exemplo, você pode redirecionar para a página de perfil do cliente.
      } catch (error) {
        console.error('Erro ao atualizar o perfil do cliente:', error);
      }
    }
  };

  const endereco = clienteData.enderecos?.[0] || {
    logradouro: '',
    numero: '',
    complemento: '',
    cep: '',
    bairro: '',
  };
  
  const [logradouro, setLogradouro] = useState(endereco.logradouro || '');
  const [numero, setNumero] = useState(endereco.numero || '');
  const [complemento, setComplemento] = useState(endereco.complemento || '');
  const [cep, setCep] = useState(endereco.cep || '');
  const [bairro, setBairro] = useState(endereco.bairro || '');
  const [telefones, setTelefones] = useState(clienteData.telefones || ['']);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={clienteData?.nome || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={clienteData?.email || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="cpfOuCnpj">CPF/CNPJ:</label>
        <input
          type="text"
          id="cpfOuCnpj"
          name="cpfOuCnpj"
          value={clienteData?.cpfOuCnpj || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="tipo">Tipo de Cliente:</label>
        <select
          id="tipo"
          name="tipo"
          value={clienteData?.tipo || '1'}
          onChange={handleInputChange}
          required
        >
          <option value="1">Pessoa Física</option>
          <option value="2">Pessoa Jurídica</option>
        </select>
      </div>
      <div>
        <label htmlFor="logradouro">Logradouro:</label>
        <input
          type="text"
          id="logradouro"
          name="logradouro"
          value={logradouro}
          onChange={(e) => setLogradouro(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="numero">Número:</label>
        <input
          type="text"
          id="numero"
          name="numero"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="complemento">Complemento:</label>
        <input
          type="text"
          id="complemento"
          name="complemento"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bairro">Bairro:</label>
        <input
          type="text"
          id="bairro"
          name="bairro"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="cep">CEP:</label>
        <input
          type="text"
          id="cep"
          name="cep"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="telefone">Telefone:</label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          value={telefones[0]}
          onChange={(e) => {
            const newTelefones = [...telefones];
            newTelefones[0] = e.target.value;
            setTelefones(newTelefones);
          }}
        />
      </div>
      <div>
        <label htmlFor="estado">Estado:</label>
        <select
          id="estado"
          name="estado"
          value={selectedEstadoId || ''}
          onChange={(e) => setSelectedEstadoId(Number(e.target.value))}
        >
          <option value="">Selecione um estado</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cidade">Cidade:</label>
        <select
          id="cidade"
          name="cidade"
          value={selectedCidade || ''}
          onChange={handleCidadeChange}
        >
          <option value="">Selecione uma cidade</option>
          {cidades.map((cidade, index) => (
            <option key={index} value={cidade}>
              {cidade}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button type="submit">Salvar</button>
      </div>
    </form>
  );
};

export default CadastroClienteForm;
