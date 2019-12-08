<?php


namespace App\Repositories;


use Illuminate\Database\Eloquent\Model;

class ModelRepository implements ModelInterface
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function model()
    {
        return $this->model;
    }

    public function index()
    {
        return $this->model->all();
    }

    public function store(array $data)
    {
        $this->model->fill($data);
        $this->model->save();
        return $this->model;
    }

    public function update(array $data, Model $model)
    {
        $model->fill($data);
        $model->save();
        return $model;
    }
}