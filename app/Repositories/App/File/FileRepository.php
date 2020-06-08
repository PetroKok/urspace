<?php


namespace App\Repositories\App\File;

use App\Huffman\Huffman;
use App\Repositories\ModelRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class FileRepository extends ModelRepository
{
    protected $model;

    public function index()
    {
        return Auth::user()->files()->orderBy('updated_at', 'desc')->get();
    }

    public function accessed_files()
    {
        return Auth::user()->file;
    }

    public function store(array $data)
    {
        $info_files = [];
        $u = Auth::user()->id;

        foreach ($data['files'] as $key => $item) {
            $uuid = Carbon::now()->format('y-m-d-h-m-i');
            $info_files[$key]['name'] = $uuid . '-' . $item->getClientOriginalName();
            $info_files[$key]['src'] = $uuid . '-' . $item->getClientOriginalName();
            $info_files[$key]['type'] = $item->getClientMimeType();
            $info_files[$key]['size'] = $item->getSize();
            $info_files[$key]['user_id'] = $u;
            $item->storeAs('/public/' . $u, $info_files[$key]['name']);
        }

        $datas = [];
        if (count($info_files) > 1) {
            foreach ($info_files as $key => $item) {
                $model = $this->model->create($item);
                $datas[$key] = $model;
            }
        } else if (count($info_files) == 1) {
            $this->model->fill($info_files[0]);
            $this->model->save();
            $datas = [$this->model];
        }

        if(isset($data['type']) && $data['type'] === 'compress'){
            $datas = $this->compressing($datas);
        }

        return $datas;
    }

    public function compressing($items){
        $u = Auth::user()->id;
        foreach ($items as $key => $data) {
            $path = storage_path('app/public/' . $u . '/' . $data->src);
            $file_content = file_get_contents($path);

            $huffman = new Huffman();

            $file_content_compressed = $huffman->compress($file_content);


            file_put_contents($path, $file_content_compressed);

            $data->size = filesize($path);
            $data->compressed = true;
            $data->save();

            $items[$key] = $data;
        }
        return $items;
    }
}
