<?php


namespace App\Repositories\App\File;

use App\Repositories\ModelRepository;
use Illuminate\Support\Facades\Auth;

class FileRepository extends ModelRepository
{
    protected $model;

    public function index()
    {
        return Auth::user()->files()->orderBy('updated_at', 'desc')->get();
    }

    public function store(array $data)
    {
        $info_files = [];
        $u = Auth::user()->id;

        foreach ($data['files'] as $key => $item) {
            $info_files[$key]['name'] = $item->getClientOriginalName();
            $info_files[$key]['src'] = $item->getClientOriginalName();
            $info_files[$key]['type'] = $item->getClientMimeType();
            $info_files[$key]['size'] = $item->getSize();
            $info_files[$key]['user_id'] = $u;
            $item->storeAs('/public/'.$u, $info_files[$key]['name']);
        }

        if (count($info_files) > 1) {
            $datas = [];
            foreach ($info_files as $key => $item) {
                $model = $this->model->create($item);
                $datas[$key] = $model;
            }
            return $datas;
        } else if (count($info_files) == 1){
            $this->model->fill($info_files[0]);
            $this->model->save();
            return [$this->model];
        }
        return false;
    }
}