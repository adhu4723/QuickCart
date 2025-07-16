import React, { useContext, useState } from 'react';
import MyModal from '../components/common/Modal';
import { Form, Input, InputNumber, Select, Switch, Button, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CategoryContext } from '../context/CategoryContext';
import { ProductContext } from '../context/ProductContext';
import MyTable from '../components/common/Table';

const { Option } = Select;

function Product() {
  const { categories } = useContext(CategoryContext);
  const { products, addProduct, deleteProduct, loading } = useContext(ProductContext);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleAddProduct = async () => {
    try {
      const values = await form.validateFields();

      if (fileList.length === 0) {
        message.error('Please upload at least one image');
        return;
      }

      setConfirmLoading(true);

      const result = await addProduct(values, fileList);

      if (result.success) {
        message.success('Product added successfully');
        form.resetFields();
        setFileList([]);
        setSelectedCategoryId(null);
      } else {
        message.error(result.error);
      }
    } catch (err) {
      console.log('Validation Failed:', err);
    } finally {
      setConfirmLoading(false);
    }
  };

  const getSubcategoriesByCategoryId = (categoryId) => {
    const category = categories.find((c) => c._id === categoryId);
    return category?.subcategories || [];
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const columns = [
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <div className="flex gap-2 flex-wrap">
          {images?.map((img, idx) => (
            <img key={idx} src={img} alt="preview" className="w-12 h-12 object-cover rounded" />
          ))}
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (id) => {console.log(id),console.log(categories)
      
       ,categories.find((c) => c._id === id._id)?.name || 'N/A'},
    },
    {
      title: 'Subcategory',
      dataIndex: 'subcategory',
      key: 'subcategory',
      render: (id, record) => {
        console.log(record);
        
        const category = categories.find((cat) => cat._id === record.category._id);
        const subcat = category?.subcategories?.find((s) => s._id === id);
        return subcat?.name || 'N/A';
      },
    },
    {
      title: 'Featured',
      dataIndex: 'isFeatured',
      key: 'isFeatured',
      render: (val) => (val ? 'Yes' : 'No'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button danger onClick={() => deleteProduct(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Product List</h1>
        <MyModal
          title="Add Product"
          modalbtntxt="Add Product"
          btntext={<PlusOutlined />}
          onConfirm={handleAddProduct}
          confirmLoading={confirmLoading}
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Product name is required' }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea rows={3} placeholder="Enter description" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Price is required' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Stock" name="stock" initialValue={0}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Upload Images">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleImageChange}
                beforeUpload={() => false} // prevent auto upload
                multiple
              >
                {fileList.length >= 5 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Category is required' }]}
            >
              <Select
                placeholder="Select category"
                onChange={(value) => {
                  form.setFieldsValue({ subcategory: undefined });
                  setSelectedCategoryId(value);
                }}
              >
                {categories.map((cat) => (
                  <Option key={cat._id} value={cat._id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Subcategory"
              name="subcategory"
              rules={[{ required: true, message: 'Subcategory is required' }]}
            >
              <Select
                placeholder="Select subcategory"
                disabled={!selectedCategoryId}
              >
                {getSubcategoriesByCategoryId(selectedCategoryId).map((sub) => (
                  <Option key={sub._id} value={sub._id}>
                    {sub.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Featured" name="isFeatured" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Form>
        </MyModal>
      </div>

      <div>
        <MyTable columns={columns} data={products} loading={loading} />
      </div>
    </div>
  );
}

export default Product;
