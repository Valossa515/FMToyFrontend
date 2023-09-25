import { CidadeDTO } from "models/cidade";
import { ClienteDTO } from "models/cliente";
import { EstadoDTO } from "models/estado";
import { useEffect, useState } from 'react';
import clienteservice from "services/clienteservice";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import estadoService from "services/estadoservice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  id: string;
}

function ProfileForm({ id }: Props) {
  const [estados, setEstados] = useState<EstadoDTO[]>([]); // Estado para armazenar a lista de estados
  const [cidades, setCidades] = useState<CidadeDTO[]>([]); // Estado para armazenar a lista de cidades
  const [cliente, setCliente] = useState<ClienteDTO>({
    id: 0,
    nome: '',
    cpfOuCnpj: '',
    tipo: 1,
    telefone1: '',
    telefone2: '',
    telefone3: '',
  })
  const initialClienteState: ClienteDTO = {
    nome: '',
    cpfOuCnpj: '',
    tipo: 1,
    telefone1: '',
    telefone2: '',
    telefone3: '',
  };


  const [endereco, setEndereco] = useState({
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    estadoId: 0,
    cidadeId: 0,
  })

  const initialEnderecoState = {
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    estadoId: 0,
    cidadeId: 0,
  };




  useEffect(() => {
    // Função para carregar estados ao montar o componente
    const loadEstados = async () => {
      try {
        const estadosData = await estadoService.getEstados();
        setEstados(estadosData);
      } catch (error) {
         toast.error('Erro ao carregar estados:', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    loadEstados();
  }, []);



  const handleEstadoChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEstadoId = parseInt(e.target.value, 10);
    setEndereco({ ...endereco, estadoId: selectedEstadoId }); // Atualize o estado selecionado

    if (selectedEstadoId === 0) {
      // Limpe a lista de cidades se nenhum estado for selecionado
      setCidades([]);
    } else {
      // Carregue as cidades com base no estado selecionado
      try {
        const cidadesData = await estadoService.getCidadesPorEstado(selectedEstadoId);
        setCidades(cidadesData);
      } catch (error) {
        toast.error('Erro ao carregar cidades:', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Atualize o valor do campo "tipo" no objeto "cliente" conforme a seleção
    const selectedTipo = parseInt(e.target.value, 10);
    setCliente({ ...cliente, tipo: selectedTipo });
  };

  const handleTelefone1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, telefone1: e.target.value });
  };

  const handleTelefone2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, telefone2: e.target.value });
  };

  const handleTelefone3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, telefone3: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isNaN(endereco.estadoId) || isNaN(endereco.cidadeId)) {
      toast.error('estadoId ou cidadeId não são números válidos.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    const clientId = parseInt(id, 10);

    try {
      const clienteData = {
        nome: cliente.nome,
        cpfOuCnpj: cliente.cpfOuCnpj,
        tipo: cliente.tipo,
        telefone1: cliente.telefone1,
        telefone2: cliente.telefone2,
        telefone3: cliente.telefone3,
        ...endereco,
      };
      await clienteservice.updateProfileAndAddress(clientId, clienteData);
      toast.success('Perfil atualizado com sucesso!', {
        position: toast.POSITION.TOP_CENTER,
      });

      setCliente({ ...initialClienteState });
      setEndereco({ ...initialEnderecoState });

    } catch (error) {
      toast.error('Erro ao atualizar perfil. Tente novamente mais tarde.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <div className="container">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="mx-auto">
        <div className="mb-3 col-md-6">
          <label htmlFor="nome" className="form-label">Nome:</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={cliente.nome}
            onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
          />
        </div>
  
        <div className="mb-3 col-md-6">
          <label htmlFor="cpfOuCnpj" className="form-label">CPF OU CNPJ:</label>
          <input
            type="text"
            className="form-control"
            id="cpfOuCnpj"
            value={cliente.cpfOuCnpj}
            onChange={(e) => setCliente({ ...cliente, cpfOuCnpj: e.target.value })}
          />
        </div>
  
        <div className="mb-3 col-md-6">
          <label htmlFor="tipo" className="form-label">Tipo:</label>
          <select
            className="form-select"
            id="tipo"
            value={cliente.tipo}
            onChange={handleTipoChange}
          >
            <option value={1}>Pessoa Física</option>
            <option value={2}>Pessoa Jurídica</option>
          </select>
        </div>
  
        <div className="mb-3 col-md-6">
          <label htmlFor="logradouro" className="form-label">Logradouro:</label>
          <input
            type="text"
            className="form-control"
            id="logradouro"
            value={endereco.logradouro}
            onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })}
          />
        </div>
  
        <div className="mb-3 col-md-6">
          <label htmlFor="numero" className="form-label">Número:</label>
          <input
            type="text"
            className="form-control"
            id="numero"
            value={endereco.numero}
            onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
          />
        </div>
  
        <div className="mb-3 col-md-6">
          <label htmlFor="complemento" className="form-label">Complemento:</label>
          <input
            type="text"
            className="form-control"
            id="complemento"
            value={endereco.complemento}
            onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
          />
        </div>
  
        <div className="mb-3 col-md-6">
          <label htmlFor="bairro" className="form-label">Bairro:</label>
          <input
            type="text"
            className="form-control"
            id="bairro"
            value={endereco.bairro}
            onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
          />
        </div>
  
        <div className="mb-3 col-md-6">
          <label htmlFor="cep" className="form-label">CEP:</label>
          <input
            type="text"
            className="form-control"
            id="cep"
            value={endereco.cep}
            onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
          />
        </div>
  
        <div className="mb-3 col-md-6">
          <label htmlFor="telefone1" className="form-label">Telefone 1 (Obrigatório):</label>
          <input
            type="text"
            className="form-control"
            id="telefone1"
            value={cliente.telefone1}
            onChange={handleTelefone1Change}
          />
        </div>
  
        <div className="mb-3 col-md-6">
          <label htmlFor="telefone2" className="form-label">Telefone 2:</label>
          <input
            type="text"
            className="form-control"
            id="telefone2"
            value={cliente.telefone2}
            onChange={handleTelefone2Change}
          />
        </div>
  
        <div className="mb-3 col-md-6">
          <label htmlFor="telefone3" className="form-label">Telefone 3:</label>
          <input
            type="text"
            className="form-control"
            id="telefone3"
            value={cliente.telefone3}
            onChange={handleTelefone3Change}
          />
        </div>
  
        <div className="mb-3 col-md-6">
          <label htmlFor="estado" className="form-label">Estado:</label>
          <select
            className="form-select"
            id="estado"
            value={endereco.estadoId}
            onChange={handleEstadoChange}
          >
            <option value={0}>Selecione um estado</option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.nome}
              </option>
            ))}
          </select>
        </div>
  
        <div className="mb-3 col-md-6">
          <label htmlFor="cidade" className="form-label">Cidade:</label>
          <select
            className="form-select"
            id="cidade"
            value={endereco.cidadeId}
            onChange={(e) => setEndereco({ ...endereco, cidadeId: parseInt(e.target.value, 10) })}
          >
            <option value={0}>Selecione uma cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.id}>
                {cidade.nome}
              </option>
            ))}
          </select>
        </div>
  
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
  

}

export default ProfileForm;