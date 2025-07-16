import React, { useContext } from 'react';
import MyModal from '../components/common/Modal';

import { Form, Input, Space, Popconfirm ,Tag, Button} from 'antd';
import { CategoryContext } from '../context/CategoryContext';
import MyTable from '../components/common/Table';
import { PlusOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';

function Category() {
 const {
  categoryName,
  categoryError,
  confirmLoading,
  handleInputChange,
  handleAddCategory,
  deleteCategory,
  categories,
  subcategoryInputs,
  handleSubcategoryInputChange,
  addSubcategory,
  deleteSubcategory,
} = useContext(CategoryContext);

 const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Stocks',
    dataIndex: 'stocks',
    key: 'stocks',
  },
  {
  title: 'Subcategories',
  key: 'subcategories',
  width: 400, // fixed width
  render: (_, record) => (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {(record?.subcategories || []).map((sub) => (
          <Tag key={sub._id} closable onClose={() => deleteSubcategory(record._id, sub._id)}>
            {sub.name}
          </Tag>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <Input
          size="small"
          placeholder="Add subcategory"
          value={subcategoryInputs[record._id] || ''}
          onChange={(e) => handleSubcategoryInputChange(record._id, e.target.value)}
        />
        <Button
          size="small"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => addSubcategory(record._id)}
        />
      </div>
    </div>
  ),
},
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Popconfirm
          title="Are you sure to delete this category?"
          onConfirm={() => deleteCategory(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
        </Popconfirm>
      </Space>
    ),
  },
];


  return (
    <div>
      <div className="flex justify-between ">
        <h1 className="text-lg font-semibold ">Category List</h1>
        <MyModal
          title={'Add Category'}
          modalbtntxt={'Add Category'}
          btntext={<PlusOutlined />}
          onConfirm={handleAddCategory}
          confirmLoading={confirmLoading}
        >
          <Form layout="vertical">
            <Form.Item
              validateStatus={categoryError ? 'error' : ''}
              help={categoryError}
            >
              <Input
                placeholder="Enter category name"
                showCount
                maxLength={20}
                value={categoryName}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Form>
        </MyModal>
      </div>

      <div className="">
        <MyTable columns={columns} data={categories} />
      </div>
    </div>
  );
}

export default Category;
