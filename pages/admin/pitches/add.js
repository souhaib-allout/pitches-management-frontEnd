import SideMenue from "../../../components/parts/admin/sideMenue";
import {Button, Checkbox, Form, Input, Radio, Select, Upload, InputNumber, Modal, Dropdown, Space} from "antd";
import {useState} from "react";
import {useRouter} from "next/router";
import {DownOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";


const {Option} = Select;
const {TextArea} = Input;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const addUser = (props) => {
    const router = useRouter();

    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log(fileList)
    };
    const handleCancel = () => setPreviewOpen(false);

    const onPreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));

    };

    const onFinish = (values) => {

        const formData = new FormData();


        for (let i = 0; i < fileList.length; i++) {
            formData.append('dataImages', fileList[i].originFileObj);
        }
        delete values.images

        formData.append('data', JSON.stringify(values));

        fetch('http://localhost:8080/api/pitches', {
            method: 'POST', // or 'PUT'
            headers: {},
            body: formData,
        })
            .then((data) => {
                router.push("/admin/pitches")
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="d-flex">

                <SideMenue/>
                <div className="container mt-5">
                    <h3 className="text-center mb-5">Add Pitch</h3>

                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"

                    >
                        <div className="row">
                            <div className="col-6">
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name!',
                                        },
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                            </div>
                            <div className="col-6">
                                <Form.Item
                                    label="type"
                                    name="type"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input type!',
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{width: 120}}
                                        options={[
                                            {
                                                value: 'Football',
                                                label: 'Football',
                                            },
                                            {
                                                value: 'BasketBall',
                                                label: 'BasketBall',
                                            },

                                        ]}
                                    />
                                </Form.Item>
                            </div>

                            <div className="col-6">
                                <Form.Item
                                    label="Capacity"
                                    name="capacity"
                                    style={{width: '100%'}}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input capacity!',
                                        },
                                    ]}
                                >

                                    <InputNumber/>
                                </Form.Item>
                            </div>
                            <div className="col-6">
                                <Form.Item
                                    label="Price"
                                    name="price"
                                    style={{width: '100%'}}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input price!',
                                        },
                                    ]}
                                >

                                    <InputNumber/>
                                </Form.Item>
                            </div>

                            <div className="col-6">
                                <Form.Item
                                    label="Covered"
                                    name="covered"
                                >
                                    <Select
                                        placeholder="Is ptich covred"
                                        allowClear>
                                        <Option value="true">Yes</Option>
                                        <Option value="false">No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="col-6">
                                <Form.Item
                                    label="Ville"
                                    name="ville_id"
                                >
                                    <Select
                                        placeholder="Is ptich covred"
                                        allowClear>
                                        {props.villes.map(ville =>
                                            <Option value={ville.id}>{ville.name}</Option>
                                        )}
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className="col-6">
                                <Form.Item
                                    label="Address"
                                    name="location"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input  location!',
                                        },
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                            </div>
                            <div className="col-6">
                                <Form.Item
                                    label="Images"
                                    name="images"

                                >
                                    <ImgCrop rotate aspect="2.1">
                                        <Upload
                                            action="/api/uploadImage"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onChange={onChange}
                                            onPreview={onPreview}>
                                            Upload
                                        </Upload>
                                    </ImgCrop>

                                </Form.Item>
                            </div>


                        </div>
                        <Form.Item wrapperCol={{span: 1, offset: 6}}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>


                    </Form>


                </div>
            </div>


            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>

        </>
    )

}

export default addUser

export async function getServerSideProps(context) {

    const res2 = await fetch(`http://localhost:8080/api/villes`)
    const villes = await res2.json()

    // Pass data to the page via props
    return {props: {villes}}
}
