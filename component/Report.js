import React , {  useEffect, useState }from 'react';
import DataTable from 'react-data-table-component'
import { Button, Col, Container,Row} from "react-bootstrap";
import { TextField } from '@mui/material';
import ConfigApplication from '../application.json'

export default function Report(){
const [dataReport, setDataReport] = useState([]);
const [selectDateFrom,setSelectDateFrom] = React.useState();
const [selectDateTo,setSelectDateTo] = React.useState();
const URL = (ConfigApplication.developMode=="Y")?ConfigApplication.API_URL_LOCAL:ConfigApplication.API_URL;

function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(array) {
     
    console.log('downloadCSV');

    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
if (csv == null) return;

    const filename = 'export.csv';

    link.setAttribute('href', "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}

const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;
const data = dataReport;
    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(dataReport)} />, [dataReport]) ;

    async function fetchData(startDate,endDate){
        console.log('fetchData Report ');
        console.log("URL: "+URL);
        console.log('startDate: '+startDate)
        console.log('endDate: '+endDate)
     //   urlGetDetail = URL+'/getAllDetail'
        const resAir= await fetch(URL+'/getAllDetail?StartDate='+startDate+'&EndDate='+endDate,{
            withCredentials: true,  
            crossorigin: true,  
        });
        resAir
        .json()
        .then(res =>  setDataReport(res))
        .catch(err => setError(err));
    }
    
    useEffect(()=>{
        
     },[])

     const search = () => {
        console.log('search');
        console.log(selectDateFrom)
        console.log(selectDateTo)
        if(selectDateFrom){
            console.log('selectDateFrom');
        }
        if(selectDateTo){
            console.log('selectDateTo');
        }
        fetchData(selectDateFrom,selectDateTo);
     }
 
     const columns = [
        {
            name: 'AircraftType',
            selector: row => row.aircraftType,
        },
        {
            name: 'AircraftSn',
            selector: row => row.aircraftSn,
        },
        {
            name: 'System',
            selector: row => row.system,
        },
        {
            name: 'PrimaryPilot',
            selector: row => row.primaryPilot,
        },
        {
            name: 'SecondaryPilot',
            selector: row => row.secondaryPilot,
        },
        {
            name: 'Recoder',
            selector: row => row.recoder,
        },
        {
            name: 'Date',
            selector: row => row.date,
        },
        {
            name: 'Trouble',
            selector: row => row.Trouble,
        },
        {
            name: 'TechnicalOrder',
            selector: row => row.technicalOrder,
        },
        {
            name: 'TroubleShooting',
            selector: row => row.troubleShooting,
        }, {
            name: 'Replace',
            selector: row => row.replace,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'PartNumber',
            selector: row => row.partNumber,
        },
        {
            name: 'SerailNumberRemove',
            selector: row => row.serailNumberRemove,
        }, {
            name: 'SerailNumberInstall',
            selector: row => row.serailNumberInstall,
        },
        {
            name: 'Remark',
            selector: row => row.remark,
        },
        {
            name: 'imageSerailNumberRemove',
            selector: row => row.imageSerailNumberRemove,
        },
        {
            name: 'ImageSerailNumberInstall',
            selector: row => row.ImageSerailNumberInstall,
        },
    ];

    return(
        <Container>
        <Row>
            <Col>
                <label  style={{margin: 5}}>
                    Date From
                </label>
                <TextField id="date_from"
                    type="date"
                    onChange={(e) => {
                        setSelectDateFrom(e.target.value)
                      }}>
                </TextField>
            </Col>
            <Col>
                <label style={{margin: 5}}>
                    Date To
                </label>
                <TextField 
                    id="date_to"
                    type="date"
                    onChange={(e) => {
                        setSelectDateTo(e.target.value)
                      }}>
                </TextField>
            </Col>  
            <Col>
                <Button id='search' onClick={search}>Search</Button>         
            </Col>
         </Row>
        <DataTable
        actions={actionsMemo} 
            columns={columns}
            data={dataReport}
            
        />
        </Container>
       
    );
}