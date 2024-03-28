import { Button, Flex, Input, Modal, Table, Form } from "antd";
import { useEffect, useState } from "react";
import TurmaService from "../../../services/TurmaService";
import Title from "antd/lib/typography/Title";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import TurmaModal from "./TurmaModal";



function TurmaTabela(){

    const [turmas, setTurmas] = useState([]);

    const [abrirModal, setAbrirModal] = useState(false);

    const buscarTurmas = async () => {
        try{
            const turmas = await TurmaService.listar();
            setTurmas(turmas);
        }catch(error){
            console.log("Erro ao buscar turmas", error);
        }
    }

    useEffect(() => {buscarTurmas()},[]);

    /*
        useEffect(function(){}) //ele vai chamar a função sempre que for necessário

        useEffect(function(){},[]) //ele vai chamar a função na primeira renderização

        useEffect(function(){},[variavel1, variavel2...]) //ele vai chamar a função sempre que a variável1 ou variável2 mudar
    */

    function editar(registro){
        console.log(registro);
    }

    function excluir({id}){
        Modal.confirm({
            title: "Deseja realmente excluir a turma?",
            content: "Você vai apagar a turma definitivamente!",
            okText: "Excluir",
            okType: "danger",
            cancelText: "Cancelar",
            onOk(){
                TurmaService.excluir(id).then(()=>{
                    buscarTurmas();
                    const tumasAtualizadas = turmas.filter(turma => turma.id !== id);
                    setTurmas(tumasAtualizadas);
                    console.log("Turma excluída com sucesso");
                }).catch(()=>{});
                
            },
            onCancel(){
                console.log("Cancelado");
            }
        
        })
    }

    const columns = [
        {title: "ID", dataIndex : "id", key : "id"},
        {title: "Nome", dataIndex : "nome", key : "nome"},
        {title: "Ações", dataIndex : "acoes", key : "acoes", render: (_, record) => (
            <>
                <Button onClick={()=>{editar(record)}}><EditTwoTone /></Button>
                <Button  danger onClick={()=>{excluir(record)}}><DeleteTwoTone /></Button>
            </>
        )},
    ];

   
    

    return (
        <>
            <Title level={2}>Turmas</Title>
            <Flex justify="end" style={{marginBottom : 10}}>
                <Button type="primary" onClick={()=>{setAbrirModal(true)}}>Novo</Button>
            </Flex>
            
            <Table dataSource={turmas} columns={columns}/>        

            <TurmaModal abrirModal={abrirModal} setAbrirModal={setAbrirModal} buscarTurmas={buscarTurmas}/>
        </>
    );
}

export default TurmaTabela;


