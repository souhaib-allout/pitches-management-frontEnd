import {Button, Dropdown, Input, Space, Table, Image,Modal} from "antd";
import {useRef, useState} from "react";
import {DownOutlined, SearchOutlined, SmileOutlined} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import SideMenue from "../../../components/parts/admin/sideMenue";
import Link from "next/link";


const Pitches = (props) => {
    console.log(props)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data,setData]=useState(props?.data)
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const warningModal = (e) => {
        Modal.warning({
            title: 'Delete warnning' ,
            content: 'Do you want delete this record ?',
            onOk() {
                fetch('http://localhost:8080/api/pitches/'+e,
                    {
                        method: 'DELETE',
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        setData(data)
                        success()
                    });

            },
            onCancel() {
                console.log('Cancel');
            },


        });
    };
    const success = () => {
        Modal.success({
            content: 'Record Deleted Success',
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Ville',
            dataIndex: 'ville_name',
            key: 'ville_name',
            sorter: (a, b) => a.ville.name.length - b.ville.name.length,
            ...getColumnSearchProps('ville_name'),
            render: (_, record) => (
                <span>{record.ville?.name}</span>
            ),

        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
            sorter: (a, b) => a.type.length - b.type.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            key: 'capacity',
            ...getColumnSearchProps('capacity'),
            sorter: (a, b) => a.capacity - b.capacity,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Covered',
            dataIndex: 'covered',
            key: 'covered',
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.covered.length - b.covered.length,
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <span>{record.covered ? 'Yes' : 'No'}</span>
            ),

        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            ...getColumnSearchProps('price'),
            sorter: (a, b) => a.price - b.price,
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <span>{record.price} Dh</span>
            ),

        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            ...getColumnSearchProps('location'),
            sorter: (a, b) => a.location.length - b.location.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Images',
            key: 'image',
            render: (_, record) => (
                <Image
                    width={50}
                    height={60}
                    src={"http://localhost:8080/api/storage?filePath=" + record.images[0]?.name}
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => (

                <>
                    <Space>
                        <Link href={"/admin/pitches/"+record.id}>Edit</Link>
                        <a className="text text-danger" onClick={e=>warningModal(record.id)}>Delete</a>
                    </Space>
                </>
            ),

        },
    ];

    return (
        <div className="d-flex">

            <SideMenue/>
            <div className="container mt-5">
                <h3 className="text-center mb-5">List Pitches</h3>


                <Table columns={columns} dataSource={data} pagination={tableParams.pagination}
                />

            </div>
        </div>
    );

}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:8080/api/pitches`)
    const data = await res.json()

    // Pass data to the page via props
    return {props: {data}}
}

export default Pitches
