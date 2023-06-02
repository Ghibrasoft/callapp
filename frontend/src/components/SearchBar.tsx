import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { usePersonStore } from '../store/ZustandStore';

export function SearchBar() {
    const { setWord } = usePersonStore();
    return (
        <>
            <Input.Search
                placeholder="Search..."
                enterButton={
                    <Button type="link" icon={<SearchOutlined />} />
                }
                onChange={(e) => setWord(e.target.value)}
                className='search-bar'
            />
        </>
    );
}
