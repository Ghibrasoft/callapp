import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { usePersonStore } from '../store/ZustandStore';

export function SearchBar() {
    const { setWord } = usePersonStore();
    return (
        <>
            <Input.Search
                style={{ width: "250px" }}
                placeholder="Search..."
                enterButton={
                    <Button type="primary" icon={<SearchOutlined />} />
                }
                onChange={(e) => setWord(e.target.value)}
            />
        </>
    );
}
