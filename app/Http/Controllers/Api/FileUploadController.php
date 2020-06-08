<?php

namespace App\Http\Controllers\Api;



use App\Http\Requests\FileStoreRequest;
use App\Models\File;
use App\Repositories\App\File\FileRepository;
use App\Http\Controllers\Controller;
use App\Traits\FileTrait;
use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    use FileTrait; // kinda extends

    protected $model;

    public function __construct(File $file)
    {
        $this->model = new FileRepository($file);
    }

    public function index()
    {
        return $this->model->index();
    }

    public function store(FileStoreRequest $request)
    {
        $files = $this->model->store($request->all());
        return response(['status' => 200, 'message' => ['type' => 'success', 'message' => 'Added!'], 'files' => $files]);
    }

    public function deleteFiles(Request $request)
    {
        $data = $request->all();

        if(!$this->destroyMultiple($data['files'])){
            return response(['status' => 500, 'message' => 'Error!']);
        }

        return response(['status' => 200, 'message' => 'Deleted all files']);
    }

    public function delete($id)
    {
        if($this->destroy($id)){
            return response(['status' => 200, 'message' => 'Deleted']);
        }
        return response(['status' => 500, 'message' => 'Error!']);
    }



    public function accessed()
    {
        return response(['status' => 200, 'data' => $this->model->accessed_files()], 200);
    }
}
